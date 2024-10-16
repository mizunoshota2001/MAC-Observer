import { NextResponse } from "next/server";
import { getMacAddress } from "../utils/mac";
export const dynamic = "force-dynamic";

export async function GET() {
  const device = getMacAddress();
  return NextResponse.json({
    ...device,
    name: "MAC Obs.",
  });
}
