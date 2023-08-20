import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ text: "pong" });
}

// あとで要りそう
// https://github.com/auth0/nextjs-auth0/issues/108#issuecomment-800059278
