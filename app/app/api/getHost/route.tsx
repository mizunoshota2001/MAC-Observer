import { getMacAddress } from "../utils/mac";

async function GET() {
  const device = getMacAddress();
  return new Response(
    JSON.stringify({
      ...device,
      name: "MAC Obs.",
    })
  );
}

export { GET };
