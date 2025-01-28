"use client";
import React from "react";
import { ReactLenis } from "lenis/react";

function SmoothScrolling({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {children}
    </ReactLenis>
  );
}

export default SmoothScrolling;
