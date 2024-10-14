import { pingAllIPs } from "../utils/ping";
import { getMacAddress } from "../utils/mac";
async function GET() {
  const device = getMacAddress();
  if (!device) {
    throw new Error("ネットワークの応答が正常ではありません");
  }
  const subnet = device.ip.replace(/\.\d+$/, "");
  console.log(subnet);
  await pingAllIPs(subnet);
  return new Response(JSON.stringify({ success: 1 }));
}

export { GET };
