import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import { getTaleByMarkdown, getTalesDirectory } from "./helper";

export async function GET(
  _req: NextRequest,
  { params }: { params: { lang: string } }
) {
  const lang = params.lang;

  if (typeof lang !== "string" || (lang !== "ja" && lang !== "en")) {
    return NextResponse.json(
      { message: "invalid lang params" },
      { status: 404 }
    );
  }
  async function getSortedTales(lang: "en" | "ja") {
    const fileNames = fs.readdirSync(getTalesDirectory(lang));
    const allTales = await Promise.all(
      fileNames.map(async (fileName) => {
        const tales = await getTaleByMarkdown(fileName, lang);
        return tales;
      })
    );
    return allTales.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  const tales = await getSortedTales(lang);
  return NextResponse.json({ tales }, { headers: { "content-type": "application/json" }});
}
