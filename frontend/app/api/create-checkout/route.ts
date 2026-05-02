import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-04-22.dahlia" as any,
  });

  try {
    const { priceId, mode, email } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: mode || "subscription",
      customer_email: email,
      line_items: [
        {
          price: priceId, // from Stripe dashboard
          quantity: 1,
        },
      ],
      metadata: {
        priceId: priceId,
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://veridex.ai'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://veridex.ai'}/pricing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
