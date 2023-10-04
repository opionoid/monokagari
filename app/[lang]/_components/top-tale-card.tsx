"use client";

import { Tale, TaleMatter } from "@/tales/tale-type";
import {
  Stage as PixiStage,
  Container as PixiContainer,
  Sprite as PixiSprite,
  useTick,
} from "@pixi/react";
import { DisplacementFilter, Sprite, Texture } from "pixi.js";
import { useEffect, useState } from "react";
import styles from "./top-tale-card.module.css";
import Link from "next/link";

export default function TaleCard({
  id,
  date,
  title,
  lead,
  system,
  hours,
  numOfPlayers,
}: Tale) {
  // TODO: id依存
  const filterTexture = Texture.from(
    `https://picsum.photos/seed/c${id}/1440/600`
  );

  const displacementFilter = new DisplacementFilter(
    new Sprite(filterTexture) as any,
    -6000
  );
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  useTick(() => {
    if (!hovered) return;
    if (displacementFilter.scale.x < -800) {
      displacementFilter.scale.x += 600;
      displacementFilter.scale.y += 600;
    } else if (
      displacementFilter.scale.x < -10 &&
      displacementFilter.scale.x < 10
    ) {
      displacementFilter.scale.x += 45;
      displacementFilter.scale.y += 45;
    } else {
      displacementFilter.scale.x += 150;
      displacementFilter.scale.y += 150;
    }
  });

  /**
   * resize
   */
  const [size, setSize] = useState({ width: 640, height: 240 });
  useEffect(() => {
    const resize = () => {
      setSize({
        width: window.innerWidth,
        height:
          (window.innerWidth * 9) / 16 < 240
            ? (window.innerWidth * 9) / 16
            : 240,
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
    <Link
      className={styles["tale-card"]}
      href={"/" + id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <PixiStage
        width={size.width}
        height={size.height}
        options={{ backgroundAlpha: 0 }}
      >
        <PixiContainer x={0} y={0} filters={[displacementFilter]}>
          <PixiSprite
            x={0}
            y={0}
            texture={Texture.WHITE}
            width={size.width}
            height={size.height}
            alpha={0}
          />
          <PixiSprite
            x={10}
            y={15}
            // TODO: カテゴリ依存
            image={`https://picsum.photos/seed/${id}/1440/600`}
            width={size.width - 20}
            height={size.height - 30}
          />
        </PixiContainer>
      </PixiStage>
      <TextContent
        title={title}
        date={date}
        lead={lead}
        system={system}
        numOfPlayers={numOfPlayers}
        hours={hours}
      />
    </Link>
  );
}

function TextContent({
  title,
  date,
  lead,
  system,
  numOfPlayers,
  hours,
}: TaleMatter) {
  return (
    <div className={styles["content"]}>
      <h2 className={styles["title"]}>{title}</h2>
      <p className={styles["lead"]}>{lead}</p>
      <ul className={styles["attributes"]}>
        <li>{system}</li>
        <li>{numOfPlayers}</li>
        <li>{hours}</li>
      </ul>
    </div>
  );
}
