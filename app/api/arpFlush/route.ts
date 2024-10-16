import { NextResponse } from "next/server";
import { pingAllIPs } from "../utils/ping";
import { getMacAddress } from "../utils/mac";
import logger from "../utils/logger";

export async function GET() {
  const device = getMacAddress();
  logger.info(JSON.stringify(device));
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
