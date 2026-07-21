import { NextResponse } from "next/server";
import { CREDIT_RATE_CARD } from "@/lib/credit-engine";

export async function GET(request: Request) {
  const sessionCookie = request.headers.get("cookie")?.includes("veridex_session");

  return NextResponse.json({
    rateCard: CREDIT_RATE_CARD,
    authenticated: Boolean(sessionCookie),
    defaultMonthlyAllocation: 50,
  });
}
