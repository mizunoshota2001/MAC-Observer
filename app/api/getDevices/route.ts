import { getLanMacAddresses, getMacAddress } from "../utils/mac";
import { getDevices } from "../utils/device";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

async function GET() {
  const macAddresses = await getLanMacAddresses();
  const host = getMacAddress();
  macAddresses.push(host);
  const saved = getDevices();

  if (!macAddresses) return NextResponse.json([]);

  const devices = macAddresses.map((device) => {
    const savedDevice = saved.find(
      (savedDevice) => savedDevice.mac === device.mac
    );
    return {
      ...device,
      name: savedDevice ? savedDevice.name : "Unknown",
    };
  });
  devices.sort((a, b) => a.ip.localeCompare(b.ip));
  const [known, unknown] = [
    devices.filter((device) => device.name !== "Unknown"),
    devices.filter((device) => device.name === "Unknown"),
  ];

  const response = { known: known, unknown: unknown };

  return NextResponse.json(response);
}

export { GET };
