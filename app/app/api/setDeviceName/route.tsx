import { upsert } from "../utils/device";

export async function POST(request: { json: () => any }) {
  const body = await request.json();
  upsert(body);
  return new Response(JSON.stringify({ success: 1 }));
}
