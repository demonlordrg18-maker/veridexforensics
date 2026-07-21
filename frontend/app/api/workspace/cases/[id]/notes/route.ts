import { addCaseComment, addCaseNote } from "@/lib/workspace/server-store";
import { getSessionFromCookies, unauthorizedResponse, errorResponse } from "@/lib/workspace/api-auth";

type RouteContext = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: RouteContext) {
  try {
    const session = await getSessionFromCookies();
    if (!session) return unauthorizedResponse();

    const { id } = await context.params;
    const body = await request.json();

    if (body.type === "comment") {
      const comment = await addCaseComment(session, id, body.content, body.parentId);
      return Response.json({ comment }, { status: 201 });
    }

    const note = await addCaseNote(session, id, body.content, body.title);
    return Response.json({ note }, { status: 201 });
  } catch (err) {
    return errorResponse(err instanceof Error ? err.message : "Failed to add note/comment");
  }
}
