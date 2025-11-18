"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { ChevronLeft, Check, AlertCircle, Loader2, Lock } from "lucide-react"

interface ServiceOption {
  value: string
  label: string
  price: number
}

interface ContactData {
  name: string
  email: string
  phone: string
  service: string
  date: string
  message: string
}

interface PaymentFormBackProps {
  selectedService: string
  selectedPrice: number
  serviceOptions: ServiceOption[]
  onBack: () => void
  contactData: ContactData
}

export default function PaymentFormBack({
  selectedService,
  selectedPrice,
  serviceOptions,
  onBack,
  contactData,
}: PaymentFormBackProps) {
  const stripe = useStripe()
  const elements = useElements()

  const [paymentData, setPaymentData] = useState({
    quantity: 1,
    notes: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const [cardError, setCardError] = useState<string | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const selectedServiceLabel =
    serviceOptions.find((s) => s.value === selectedService)?.label || ""

  const totalPrice = selectedPrice * paymentData.quantity

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target

    if (name === "quantity") {
      value = Math.max(1, parseInt(value) || 1).toString()
    }

    setPaymentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      setPaymentError("Payment system not ready. Please refresh and try again.")
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    try {
      // Create payment intent on the server
      const paymentIntentResponse = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(totalPrice * 100), // Convert to cents
          service: selectedService,
          serviceLabel: selectedServiceLabel,
          quantity: paymentData.quantity,
          notes: paymentData.notes,
          customerName: contactData.name,
          customerEmail: contactData.email,
          customerPhone: contactData.phone,
          preferredDate: contactData.date,
        }),
      })

      if (!paymentIntentResponse.ok) {
        throw new Error("Failed to create payment intent")
      }

      const { clientSecret } = await paymentIntentResponse.json()

      // Confirm the payment with the card element
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        throw new Error("Card element not found")
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: contactData.name,
            email: contactData.email,
            phone: contactData.phone,
          },
        },
      })

      if (result.error) {
        setPaymentError(result.error.message || "Payment failed. Please try again.")
        setIsProcessing(false)
        return
      }

      if (result.paymentIntent?.status === "succeeded") {
        setPaymentSuccess(true)

        // Save booking to database
        await fetch("/api/payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId: result.paymentIntent.id,
            amount: totalPrice,
            service: selectedService,
            serviceLabel: selectedServiceLabel,
            quantity: paymentData.quantity,
            notes: paymentData.notes,
            ...contactData,
          }),
        })

        setTimeout(() => {
          setPaymentSuccess(false)
          onBack()
          setPaymentData({
            quantity: 1,
            notes: "",
          })
        }, 3000)
      }
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentError(
        error instanceof Error ? error.message : "An error occurred during payment"
      )
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="flip-card-payment-content">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-lg p-6 sm:p-8 min-h-full flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Book & Pay
          </h2>
          <button
            onClick={onBack}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Go back to contact form"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
        </div>

        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-green-100 border-2 border-green-500 rounded-lg p-4 mb-6 text-center"
          >
            <p className="text-sm font-semibold text-green-700">
              ✅ Payment successful! Your booking is confirmed.
            </p>
          </motion.div>
        )}

        {paymentError && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-red-100 border-2 border-red-500 rounded-lg p-4 mb-6 text-center"
          >
            <p className="text-sm font-semibold text-red-700">{paymentError}</p>
          </motion.div>
        )}

        {/* Service Summary */}
        <div className="bg-primary/5 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-foreground/70 mb-2">
            Service Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-foreground">{selectedServiceLabel}</span>
              <span className="text-sm font-semibold text-primary">
                ${selectedPrice}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">Quantity:</span>
              <input
                type="number"
                name="quantity"
                value={paymentData.quantity}
                onChange={handleChange}
                min="1"
                className="w-16 px-2 py-1 rounded border border-border bg-background text-sm text-center"
              />
            </div>
            <div className="border-t border-border pt-2 flex justify-between">
              <span className="font-semibold text-foreground">Total:</span>
              <span className="text-lg font-bold text-accent">${totalPrice}</span>
            </div>
          </div>
        </div>

        {/* Contact Information Display */}
        <div className="bg-accent/5 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-foreground/70 mb-2">
            Contact Information
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-foreground"><span className="font-medium">Name:</span> {contactData.name}</p>
            <p className="text-sm text-foreground"><span className="font-medium">Email:</span> {contactData.email}</p>
            <p className="text-sm text-foreground"><span className="font-medium">Phone:</span> {contactData.phone}</p>
            {contactData.date && (
              <p className="text-sm text-foreground"><span className="font-medium">Date:</span> {contactData.date}</p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          {/* Stripe Card Element */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
              Card Details *
            </label>
            <div className="p-4 border border-border rounded-lg bg-background">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                      color: "var(--foreground)",
                      fontFamily: '"Geist", sans-serif',
                      "::placeholder": {
                        color: "var(--muted-foreground)",
                      },
                    },
                    invalid: {
                      color: "#ef4444",
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Special Requests
            </label>
            <textarea
              name="notes"
              value={paymentData.notes}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors resize-none text-sm"
              rows={2}
              placeholder="Any special requests..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="pt-2"
          >
            <Button
              type="submit"
              disabled={isProcessing || !stripe}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2.5 text-sm font-semibold"
            >
              {isProcessing ? "Processing..." : `Pay $${totalPrice}`}
            </Button>
          </motion.div>

          <p className="text-center text-xs text-foreground/70">
            Your payment information is secure and encrypted
          </p>
        </form>
      </motion.div>
    </div>
  )
}
