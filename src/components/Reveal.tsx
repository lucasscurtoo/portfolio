"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const reduce = useReducedMotion();
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Plain = (motion[as as keyof typeof motion] as typeof motion.div) || motion.div;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
