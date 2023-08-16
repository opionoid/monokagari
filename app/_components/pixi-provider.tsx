"use client";

import { Application } from "pixi.js";
import { AppProvider } from "@pixi/react";

export default function PixiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    typeof window === "undefined" ? children :
    <AppProvider
      value={
        new Application({
          resolution: window.devicePixelRatio,
          backgroundAlpha: 0,
        })
      }
    >
      {children}
    </AppProvider>
  );
}
