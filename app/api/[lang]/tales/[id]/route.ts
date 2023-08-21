import { NextRequest, NextResponse } from "next/server";
import { getTaleByMarkdown } from "../helper";

export async function GET(
  _req: NextRequest,
  { params }: { params: { lang: string; id: string } }
) {
  const { lang, id } = params;

  if (typeof lang !== "string" || (lang !== "ja" && lang !== "en")) {
    return NextResponse.json(
      { message: "invalid lang params" },
      { status: 404 }
    );
  }

  const tale = await getTaleByMarkdown(`${id}.md`, lang);
  return NextResponse.json({ tale });
}
