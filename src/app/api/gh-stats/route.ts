import { NextResponse } from "next/server";

const USER = "lucasscurtoo";
const GH = "https://api.github.com";
const HEADERS: HeadersInit = {
  Accept: "application/vnd.github+json",
  "User-Agent": "lucas-curto-portfolio",
};
// GitHub token is optional; lifts the 60/h unauth limit if present in env
const token = process.env.GITHUB_TOKEN;
if (token) (HEADERS as Record<string, string>).Authorization = `Bearer ${token}`;

const DAY = 60 * 60 * 6; // revalidate every 6h

type Lang = { name: string; bytes: number; pct: number };
type Payload = {
  repos: number;
  followers: number;
  stars: number;
  totalBytes: number;
  langs: Lang[];
  updatedAt: string;
};

export const revalidate = 21600;

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`${GH}/users/${USER}`, { headers: HEADERS, next: { revalidate: DAY } }),
      fetch(`${GH}/users/${USER}/repos?per_page=100&type=owner&sort=updated`, {
        headers: HEADERS,
        next: { revalidate: DAY },
      }),
    ]);
    if (!userRes.ok || !reposRes.ok) throw new Error("github api");

    const user = await userRes.json();
    const repos: Array<{
      fork: boolean;
      stargazers_count: number;
      languages_url: string;
    }> = await reposRes.json();

    const own = repos.filter((r) => !r.fork);
    const stars = own.reduce((s, r) => s + (r.stargazers_count || 0), 0);

    // aggregate real code volume (bytes) per language across own repos
    const totals: Record<string, number> = {};
    const langResults = await Promise.all(
      own.map((r) =>
        fetch(r.languages_url, { headers: HEADERS, next: { revalidate: DAY } })
          .then((res) => (res.ok ? res.json() : {}))
          .catch(() => ({}))
      )
    );
    for (const lr of langResults) {
      for (const [name, bytes] of Object.entries(lr as Record<string, number>)) {
        totals[name] = (totals[name] || 0) + bytes;
      }
    }
    const totalBytes = Object.values(totals).reduce((a, b) => a + b, 0) || 1;
    const langs: Lang[] = Object.entries(totals)
      .map(([name, bytes]) => ({ name, bytes, pct: (bytes / totalBytes) * 100 }))
      .sort((a, b) => b.bytes - a.bytes)
      .slice(0, 6);

    const payload: Payload = {
      repos: user.public_repos ?? own.length,
      followers: user.followers ?? 0,
      stars,
      totalBytes,
      langs,
      updatedAt: new Date().toISOString(),
    };
    return NextResponse.json(payload, {
      headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=86400" },
    });
  } catch {
    return NextResponse.json({ error: "unavailable" }, { status: 502 });
  }
}
