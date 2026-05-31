const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

const text = (value) => (typeof value === "string" ? value.trim() : "");

function requireBearer(request, env) {
  if (!env.EMAIL_WORKER_TOKEN) {
    return json({ error: "EMAIL_WORKER_TOKEN secret is not configured." }, 500);
  }

  const authorization = request.headers.get("Authorization") || "";
  if (authorization !== `Bearer ${env.EMAIL_WORKER_TOKEN}`) {
    return json({ error: "Unauthorized." }, 401);
  }

  return null;
}

function formatLead(payload) {
  const notes = text(payload.notes) || "(none provided)";
  return [
    "A new walkthrough request was submitted.",
    "",
    `Lead ID: ${text(payload.lead_id)}`,
    `Submitted At: ${text(payload.created_at)}`,
    `Full Name: ${text(payload.full_name)}`,
    `Work Email: ${text(payload.email)}`,
    `Organization: ${text(payload.organization)}`,
    `Role: ${text(payload.role)}`,
    `Use Case: ${text(payload.use_case)}`,
    "",
    "Notes:",
    notes,
  ].join("\n");
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405);
    }

    const authError = requireBearer(request, env);
    if (authError) return authError;

    let payload;
    try {
      payload = await request.json();
    } catch {
      return json({ error: "Expected a JSON request body." }, 400);
    }

    const fromEmail = text(env.FROM_EMAIL);
    const toEmail = text(env.TO_EMAIL);
    if (!fromEmail || !toEmail) {
      return json({ error: "TO_EMAIL and FROM_EMAIL must be configured." }, 500);
    }

    const replyTo = text(payload.email);
    const subjectName = text(payload.full_name) || "Unknown lead";
    const result = await env.SEND_EMAIL.send({
      to: toEmail,
      from: { email: fromEmail, name: text(env.FROM_NAME) || "Veridex" },
      replyTo: replyTo || undefined,
      subject: `New Veridex walkthrough request: ${subjectName}`,
      text: formatLead(payload),
    });

    return json({ ok: true, message_id: result.messageId });
  },
};
