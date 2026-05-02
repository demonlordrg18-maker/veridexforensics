import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia" as any,
  });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  try {
    if (!signature || !webhookSecret) {
      throw new Error("Missing signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      const planFromMetadata = session.metadata?.plan;

      if (email) {
        // Determine plan and credits based on metadata
        let plan = "free";
        let credits = 3;

        if (planFromMetadata === "starter") {
          plan = "starter";
          credits = 20;
        } else if (planFromMetadata === "pro") {
          plan = "pro";
          credits = 1000; // Unlimited marker
        }

        console.log(`Updating plan for ${email} to ${plan} with ${credits} credits`);

        // Call backend to update user
        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
        try {
          const response = await fetch(`${apiUrl}/users/update-plan`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, plan, credits }),
          });
          
          if (!response.ok) {
            console.error(`Failed to update plan in backend: ${response.statusText}`);
          }
        } catch (fetchError) {
          console.error(`Error calling backend /users/update-plan: ${fetchError}`);
        }
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

export const config = {
  api: {
    bodyParser: false, // Disabling body parsing to receive the raw body for signature verification
  },
};
