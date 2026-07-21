import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { workspaceId } = await request.json();
    if (!workspaceId) {
      return NextResponse.json({ error: "workspaceId is required" }, { status: 400 });
    }

    const response = NextResponse.json({ success: true, workspaceId });
    
    // Set the cookie for active workspace
    response.cookies.set({
      name: "veridex_active_workspace",
      value: workspaceId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (err) {
    return NextResponse.json({ error: "Failed to switch workspace" }, { status: 500 });
  }
}
