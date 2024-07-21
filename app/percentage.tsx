"use client";

import { useEffect, useState } from "react";
import AnimatedCircularProgressBar from "@/components/magicui/animated";
import { number } from "zod";

export function Circle({ color = "rgb(222, 0, 0)", percentage = 0 }) {
  return (
    <AnimatedCircularProgressBar
      max={100}
      min={0}
      value={percentage}
      gaugePrimaryColor={color}
      gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
    />
  );
}
