import { NextResponse } from "next/server";
import { pingAllIPs } from "@/lib/ping";
import { getMacAddress } from "@/lib/mac";
export const dynamic = "force-dynamic";

export async function GET() {
  const device = getMacAddress();
  if (!device) {
    return NextResponse.json(
      { error: "ネットワークの応答が正常ではありません" },
      { status: 500 }
    );
  }
  const subnet = device.ip.replace(/\.\d+$/, "");
  await pingAllIPs(subnet);
  return NextResponse.json({ success: 1 });
}
