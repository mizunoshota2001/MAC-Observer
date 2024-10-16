import { upsert } from "../utils/device";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  upsert(body);
  return NextResponse.json({ success: 1});
}
