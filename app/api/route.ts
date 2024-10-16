import { NextResponse } from "next/server";
import logger from "./utils/logger";

export const dynamic = "force-dynamic";

export async function GET() {
  logger.info("Hello, world!");

  const data = {
    message: "Hello, world!",
    // timestamp: new Date().toISOString(),
  };

  return NextResponse.json(data);
}
