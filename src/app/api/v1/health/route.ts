import { NextResponse } from "next/server";

import { getDocumentationHealth } from "@/lib/documentationHealth";

export function GET() {
  const health = getDocumentationHealth();

  return NextResponse.json(health);
}
