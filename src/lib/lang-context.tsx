"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Lang } from "./data";

type LangCtx = { lang: Lang; toggle: () => void };
const Ctx = createContext<LangCtx>({ lang: "en", toggle: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "en" || saved === "es") {
      setLang(saved);
    } else {
      const browserLang = (navigator.language || navigator.languages?.[0] || "en").toLowerCase();
      if (browserLang.startsWith("es")) setLang("es");
    }
  }, []);

  const toggle = () =>
    setLang((l) => {
      const next = l === "en" ? "es" : "en";
      localStorage.setItem("lang", next);
      return next;
    });

  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
