import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";
import { ThemeProvider } from "@/lib/theme-context";
import AuroraBackground from "@/components/AuroraBackground";
import DotField from "@/components/DotField";
import Ticker from "@/components/Ticker";
import HudShell from "@/components/HudShell";

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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon-180.png", sizes: "180x180" }],
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <AuroraBackground />
            <DotField />
            <HudShell />
            {children}
            <Ticker />
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
