import { NextResponse } from "next/server";

/*
  GitHub contribution calendar. The REST API doesn't expose it, so:
  - if GITHUB_TOKEN is set → GraphQL contributionsCollection (includes PRIVATE
    contributions, exact match to the profile graph)
  - else → public github-contributions-api (public contributions only)
  Username comes from GH_CONTRIB_USER env, falling back to a constant.
*/
const USER = process.env.GH_CONTRIB_USER || "lucasscurtoo";
const token = process.env.GITHUB_TOKEN;
const DAY = 60 * 60 * 6;

export const revalidate = 21600;

type Day = { date: string; count: number; level: number };

async function viaGraphQL(): Promise<{ total: number; days: Day[] }> {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{totalContributions weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "lucas-curto-portfolio",
    },
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

async function viaPublic(): Promise<{ total: number; days: Day[] }> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, {
    headers: { "User-Agent": "lucas-curto-portfolio" },
    next: { revalidate: DAY },
  });
  if (!res.ok) throw new Error("public");
  const json = await res.json();
  return { total: json.total?.lastYear ?? 0, days: json.contributions as Day[] };
}

export async function GET() {
  try {
    const data = token ? await viaGraphQL() : await viaPublic();
    return NextResponse.json(data, {
      headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
