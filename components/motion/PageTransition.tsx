"use client";

import { ViewTransition } from "react";
import type { ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "vt-fwd-in", "nav-back": "vt-back-in", default: "vt-page" }}
      exit={{ "nav-forward": "vt-fwd-out", "nav-back": "vt-back-out", default: "vt-page" }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
