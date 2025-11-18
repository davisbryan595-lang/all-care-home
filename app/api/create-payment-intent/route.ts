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
      preferredDate,
    } = body

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount. Please check your booking details." },
        { status: 400 }
      )
    }

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing customer information. Please fill in all required fields." },
        { status: 400 }
      )
    }

    if (amount > 99999900) { // Stripe max amount in cents
      return NextResponse.json(
        { error: "Payment amount exceeds maximum allowed. Please contact support." },
        { status: 400 }
      )
    }

    // Create payment intent with enhanced metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Already in cents from client
      currency: "cad",
      description: `${serviceLabel} (Qty: ${quantity}) - All Care Home Services`,
      metadata: {
        service,
        quantity: quantity.toString(),
        customerName,
        customerPhone,
        preferredDate: preferredDate || "Not specified",
      },
      receipt_email: customerEmail,
      statement_descriptor: "ALL CARE HOME SERVICES",
    })

    return NextResponse.json(
      {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Payment intent creation error:", error)

    if (error instanceof Stripe.errors.StripeInvalidRequestError) {
      return NextResponse.json(
        { error: `Invalid request: ${error.message}` },
        { status: 400 }
      )
    }

    if (error instanceof Stripe.errors.StripeAuthenticationError) {
      return NextResponse.json(
        { error: "Authentication failed. Please try again later." },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: "Failed to create payment intent. Please try again." },
      { status: 500 }
    )
  }
}
