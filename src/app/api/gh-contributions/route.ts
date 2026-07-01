import { NextResponse } from "next/server";

/*
  GitHub contribution calendar (the green squares).
  Priority:
   1. GITHUB_TOKEN → GraphQL (exact, includes private).
   2. Scrape github.com/users/<user>/contributions — live public graph, which
      already reflects "Include private contributions" (no token needed).
   3. jogruber public API as a last-resort fallback.
  Username from GH_CONTRIB_USER env, else constant.
*/
const USER = process.env.GH_CONTRIB_USER || "lucasscurtoo";
const token = process.env.GITHUB_TOKEN;
const DAY = 60 * 60 * 6;
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36";

export const revalidate = 21600;

type Day = { date: string; count: number; level: number };

async function viaGraphQL(): Promise<{ total: number; days: Day[] }> {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": UA },
    body: JSON.stringify({ query, variables: { login: USER } }),
    next: { revalidate: DAY },
  });
  if (!res.ok) throw new Error("graphql");
  const json = await res.json();
  const cal = json.data.user.contributionsCollection.contributionCalendar;
  const LVL: Record<string, number> = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 };
  const days: Day[] = cal.weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LVL[d.contributionLevel] ?? 0 }))
  );
  return { total: cal.totalContributions, days };
}

async function viaScrape(): Promise<{ total: number; days: Day[] }> {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { "User-Agent": UA, Accept: "text/html", "X-Requested-With": "XMLHttpRequest" },
    next: { revalidate: DAY },
  });
  if (!res.ok) throw new Error("scrape");
  const html = await res.text();

  // day cells: <td ... data-date="YYYY-MM-DD" ... id="..." ... data-level="N" ...>
  const byId = new Map<string, Day>();
  const tdRe = /<td[^>]*ContributionCalendar-day[^>]*>/g;
  let m: RegExpExecArray | null;
  while ((m = tdRe.exec(html))) {
    const tag = m[0];
    const date = /data-date="([0-9-]+)"/.exec(tag)?.[1];
    const level = /data-level="([0-9]+)"/.exec(tag)?.[1];
    const id = /id="([^"]+)"/.exec(tag)?.[1];
    if (date && id) byId.set(id, { date, count: 0, level: level ? +level : 0 });
  }

  // tooltips: <tool-tip for="cell-id" ...>N contributions on ...</tool-tip>
  const tipRe = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g;
  while ((m = tipRe.exec(html))) {
    const cell = byId.get(m[1]);
    if (!cell) continue;
    const num = /^(\d[\d,]*)\s+contribution/.exec(m[2].trim());
    cell.count = num ? parseInt(num[1].replace(/,/g, ""), 10) : 0;
  }

  const days = Array.from(byId.values()).sort((a, b) => a.date.localeCompare(b.date));
  const total = days.reduce((s, d) => s + d.count, 0);
  if (!days.length) throw new Error("empty");
  return { total, days };
}

async function viaPublic(): Promise<{ total: number; days: Day[] }> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, {
    headers: { "User-Agent": UA },
    next: { revalidate: DAY },
  });
  if (!res.ok) throw new Error("public");
  const json = await res.json();
  return { total: json.total?.lastYear ?? 0, days: json.contributions as Day[] };
}

export async function GET() {
  const chain = token ? [viaGraphQL, viaScrape, viaPublic] : [viaScrape, viaPublic];
  for (const fn of chain) {
    try {
      const data = await fn();
      return NextResponse.json(data, {
        headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" },
      });
    } catch {
      /* try next source */
    }
  }
  return NextResponse.json({ error: "unavailable" }, { status: 502 });
}
