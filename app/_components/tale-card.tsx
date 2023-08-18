"use client";

import { Tale } from "@/tales/tale-type";
import {
  Stage as PixiStage,
  Container as PixiContainer,
  Sprite as PixiSprite,
  Text as PixiText,
  useTick,
} from "@pixi/react";
import { DisplacementFilter, Sprite, TextStyle, Texture } from "pixi.js";
import { useEffect, useState } from "react";

import { Hina_Mincho } from "next/font/google";
import Link from "next/link";

const font = Hina_Mincho({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function TaleCard({ id, date, title, lead, system, hours, numOfPlayers }: Tale & { reverse?: boolean }) {
  const textStyle = new TextStyle({
    fontFamily: font.style.fontFamily,
    fontSize: "5rem",
  });

  const filterTexture = Texture.from("https://picsum.photos/id/404/1440/600");
  const displacementFilter = new DisplacementFilter(new Sprite(filterTexture) as any, 3000);
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useTick(() => {
    if (!hovered) return;
    if (displacementFilter.scale.x > 1000) {
      displacementFilter.scale.x -= 36;
      displacementFilter.scale.y -= 36;
    } else if (displacementFilter.scale.x > 200) {
      displacementFilter.scale.x -= 12;
      displacementFilter.scale.y -= 12;
    } else {
      displacementFilter.scale.x -= 1;
      displacementFilter.scale.y -= 1;
    }
  });

  /**
   * resize
   */
  const [size, setSize] = useState({ width: 320, height: 180 });
  useEffect(() => {
    const resize = () => {
      setSize({
        width: window.innerWidth, // < 800 ? window.innerWidth : 800,
        height: (window.innerWidth * 9) / 16 < 450 ? (window.innerWidth * 9) / 16 : 450,
      });
    };
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  const thumbnailPosition = {
    // TODO:
  };

  return (
    <Link href={"/" + id}>
      <PixiStage
        width={size.width}
        height={size.height}
        options={{ backgroundAlpha: 0 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <PixiContainer x={0} y={0} filters={[displacementFilter]}>
          <PixiSprite x={0} y={0} texture={Texture.WHITE} width={size.width} height={size.height} alpha={0} />
          <PixiSprite
            x={10}
            y={15}
            image={"https://picsum.photos/id/894/1440/600"}
            width={size.width - 20}
            height={size.height - 30}
          />
        </PixiContainer>
        <PixiContainer x={size.width * 0.3} y={size.height * 0.3}>
          <PixiText text={title} style={textStyle} />
        </PixiContainer>
      </PixiStage>
    </Link>
  );
}
