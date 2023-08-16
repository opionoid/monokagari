"use client";

import { Tale } from "@/tales/tale-type";
import {
  Stage as PixiStage,
  Container as PixiContainer,
  Sprite as PixiSprite,
  Text as PixiText,
  useTick,
} from "@pixi/react";
import {
  DisplacementFilter,
  FederatedPointerEvent,
  Sprite,
  TextStyle,
  Texture,
} from "pixi.js";
import { Tween, Easing } from "@tweenjs/tween.js";
import { use, useEffect, useRef, useState } from "react";

import { Hina_Mincho } from "next/font/google";

const font = Hina_Mincho({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function TopHero({
  id,
  date,
  title,
  lead,
  system,
  hours,
  numOfPlayers,
}: Tale) {
  const textStyle = new TextStyle({
    fontFamily: font.style.fontFamily,
    fontSize: "5rem",
  });

  const filterTexture = Texture.from("https://picsum.photos/id/404/1440/600");
  const displacementFilter = new DisplacementFilter(
    new Sprite(filterTexture) as any,
    -800
  );
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);
  useTick((delta) => {
    const p = hovered && displacementFilter.scale.x < 10;
    displacementFilter.scale.x += (p ? 8 : -0.1) * delta;
    displacementFilter.scale.y += (p ? 8 : -0.1) * delta;
})

  /**
   * resize
   */
  const [size, setSize] = useState({ width: 320, height: 180 });
  useEffect(() => {
    const resize = () => {
      setSize({
        width: window.innerWidth < 800 ? window.innerWidth : 800,
        height:
          (window.innerWidth * 9) / 16 < 450
            ? (window.innerWidth * 9) / 16
            : 450,
      });
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <PixiStage
      width={size.width}
      height={size.height}
      options={{ backgroundAlpha: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PixiContainer
        x={0}
        y={0}
        filters={[displacementFilter]}
      >
        <PixiSprite
          x={10}
          y={10}
          texture={Texture.WHITE}
          width={size.width - 20}
          height={size.height - 20}
          alpha={0}
        />
        <PixiSprite
          x={20}
          y={20}
          image={"https://picsum.photos/id/894/1440/600"}
          height={size.height * 0.4}
          width={size.width * 0.4}
        />
      </PixiContainer>
      <PixiContainer x={size.width * 0.3} y={size.height * 0.3}>
        <PixiText text={title} style={textStyle} />
      </PixiContainer>
    </PixiStage>
  );
}
