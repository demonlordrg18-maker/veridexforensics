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
      const priceId = session.metadata?.priceId;

      if (email) {
        // Determine plan and credits
        let plan = "free";
        let credits = 3;

        // You should map your Stripe Price IDs to plans
        if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_49) {
          plan = "starter";
          credits = 20;
        } else if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_299) {
          plan = "pro";
          credits = 1000; // Unlimited or high number
        }

        // Call backend to update user
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'}/users/update-plan`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, plan, credits }),
        });
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
