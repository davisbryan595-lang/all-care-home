import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-11-20",
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      paymentIntentId,
      amount,
      service,
      serviceLabel,
      quantity,
      notes,
      name,
      email,
      phone,
      date,
      message,
    } = body

    // Validation
    if (!paymentIntentId || !amount || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required booking information" },
        { status: 400 }
      )
    }

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Invalid booking amount" },
        { status: 400 }
      )
    }

    // Verify the payment intent with Stripe
    let paymentIntent: Stripe.PaymentIntent
    try {
      paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    } catch (stripeError) {
      console.error("Failed to retrieve payment intent:", stripeError)
      return NextResponse.json(
        { error: "Unable to verify payment. Please contact support." },
        { status: 400 }
      )
    }

    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: `Payment status is ${paymentIntent.status}. Only succeeded payments can be confirmed.` },
        { status: 400 }
      )
    }

    // Verify amount matches
    if (paymentIntent.amount !== Math.round(amount)) {
      console.warn(
        `Amount mismatch: expected ${amount}, got ${paymentIntent.amount}`
      )
      return NextResponse.json(
        { error: "Payment amount mismatch. Please contact support." },
        { status: 400 }
      )
    }

    // Create booking record (in a real app, this would save to a database)
    const booking = {
      id: `BOOKING-${Date.now()}`,
      paymentIntentId,
      amount,
      service,
      serviceLabel,
      quantity,
      notes,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      preferredDate: date,
      additionalInfo: message,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }

    // TODO: Save booking to database
    console.log("Booking created:", booking)

    // Send confirmation email to customer
    try {
      console.log(`Sending confirmation email to ${email}`)
      // You can integrate with an email service like Resend, SendGrid, or Nodemailer
      // Example with a custom endpoint (uncomment and configure as needed)
      // await fetch(process.env.NEXT_PUBLIC_EMAIL_SERVICE_URL || "", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     to: email,
      //     subject: "Booking Confirmation - All Care Home Services",
      //     template: "booking-confirmation",
      //     data: booking,
      //   }),
      // })
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError)
      // Continue even if email fails
    }

    // Send notification email to business
    try {
      console.log("Sending notification to admin")
      // Implement admin notification logic here
    } catch (adminError) {
      console.error("Error sending admin notification:", adminError)
      // Continue even if admin notification fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed successfully",
        booking: {
          id: booking.id,
          service: booking.serviceLabel,
          amount: booking.amount,
          date: booking.preferredDate,
          status: booking.status,
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Payment booking error:", error)

    if (error instanceof Stripe.errors.StripeInvalidRequestError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    if (error instanceof Stripe.errors.StripeAuthenticationError) {
      return NextResponse.json(
        { error: "Authentication failed. Please try again." },
        { status: 401 }
      )
    }

    return NextResponse.json(
      {
        error: "Failed to process booking",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
