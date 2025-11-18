import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      amount,
      service,
      serviceLabel,
      quantity,
      customerName,
      customerEmail,
      customerPhone,
    } = body

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      )
    }

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing customer information" },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Already in cents from client
      currency: "cad",
      description: `${serviceLabel} (Qty: ${quantity}) - All Care Home Services`,
      metadata: {
        service,
        quantity: quantity.toString(),
        customerPhone,
      },
      receipt_email: customerEmail,
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    console.error("Payment intent creation error:", error)

    if (error instanceof Stripe.errors.StripeInvalidRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    )
  }
}
