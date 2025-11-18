import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      cardNumber,
      expiryDate,
      cvc,
      service,
      serviceLabel,
      amount,
      quantity,
      notes,
    } = body

    if (!name || !email || !phone || !cardNumber || !expiryDate || !cvc) {
      return NextResponse.json(
        { error: "Missing required payment information" },
        { status: 400 }
      )
    }

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      )
    }

    // Here you would normally:
    // 1. Validate the card information
    // 2. Process the payment with a service like Stripe
    // 3. Store the booking in your database
    // 4. Send confirmation emails

    // For now, we'll just log the payment and send a success response
    console.log("Payment received:", {
      name,
      email,
      phone,
      service,
      serviceLabel,
      amount,
      quantity,
      timestamp: new Date().toISOString(),
    })

    // TODO: Replace this with actual Stripe integration
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: Math.round(amount * 100),
    //   currency: 'cad',
    //   receipt_email: email,
    // });

    // Send confirmation email to customer
    try {
      await fetch(process.env.NEXT_PUBLIC_API_EMAIL_ENDPOINT || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Booking Confirmation - All Care Home Services",
          template: "booking-confirmation",
          data: {
            name,
            service: serviceLabel,
            amount,
            quantity,
            notes,
          },
        }),
      }).catch(() => {
        // Email endpoint not configured, continue anyway
      })
    } catch {
      // Email sending failed, but payment was successful
    }

    return NextResponse.json(
      {
        success: true,
        message: "Payment processed successfully",
        booking: {
          id: `BOOKING-${Date.now()}`,
          service,
          amount,
          quantity,
          bookedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Payment API error:", error)

    return NextResponse.json(
      {
        error: "Failed to process payment",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
