import { getLanMacAddresses, getMacAddress } from "../utils/mac";
import { getDevices } from "../utils/device";

async function GET() {
  const macAddresses = await getLanMacAddresses();
  const host = getMacAddress();
  macAddresses.push(host);
  const saved = getDevices();

  if (!macAddresses) return new Response(JSON.stringify([]));

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

  const responce = { known: known, unknown: unknown };

  return new Response(JSON.stringify(responce));
}

export { GET };
