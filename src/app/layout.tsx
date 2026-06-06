import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import { ThemeProvider } from "@/lib/theme-context";
import AuroraBackground from "@/components/AuroraBackground";

export const metadata: Metadata = {
  title: "Lucas Curto — Full-Stack Developer | NestJS · Next.js · AWS",
  description:
    "Full-stack developer from Montevideo, Uruguay. I build complete production systems end-to-end — NestJS backend, Next.js frontend, AWS infrastructure. Domain-Driven Design specialist.",
  keywords: [
    "full-stack developer",
    "NestJS",
    "Next.js",
    "AWS",
    "DDD",
    "Domain-Driven Design",
    "backend developer",
    "TypeScript",
    "software engineer",
    "Uruguay",
    "Montevideo",
  ],
  authors: [{ name: "Lucas Curto" }],
  openGraph: {
    title: "Lucas Curto — Full-Stack Developer",
    description:
      "Building complete production systems end-to-end. NestJS · Next.js · AWS · DDD. Based in Montevideo, Uruguay.",
    url: "https://lucascurto.dev",
    siteName: "Lucas Curto",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lucas Curto — Full-Stack Developer",
    description: "NestJS · Next.js · AWS · DDD. Building complete systems end-to-end.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LangProvider>
            <AuroraBackground />
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
