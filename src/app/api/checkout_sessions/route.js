import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "../../../lib/stripe";
import { getUserSession } from "@/src/lib/core/session";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");


    const formData = await request.formData();
    const license = formData.get('license');
    const payment = formData.get('payment');

    console.log(license, payment) // showing undefine

    const user = await getUserSession();

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Appointment Fee",
            },
            unit_amount: Number(payment) * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/doctors/${license}/reqAppointment?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
