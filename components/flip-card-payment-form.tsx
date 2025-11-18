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
    setPaymentError(null)
  }

  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message)
    } else {
      setCardError(null)
    }
  }

  const validateInputs = (): boolean => {
    if (!stripe || !elements) {
      setPaymentError("Payment system not ready. Please refresh and try again.")
      return false
    }

    if (paymentData.quantity < 1) {
      setPaymentError("Quantity must be at least 1")
      return false
    }

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setPaymentError("Card element not found")
      return false
    }

    return true
  }

  const handleProcessPayment = async () => {
    if (!validateInputs()) {
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
      const cardElement = elements!.getElement(CardElement)
      if (!cardElement) {
        throw new Error("Card element not found")
      }

      const result = await stripe!.confirmCardPayment(clientSecret, {
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
        setShowConfirmation(false)
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
          setShowConfirmation(false)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
  }

  return (
    <div className="flip-card-payment-content">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-lg p-6 sm:p-8 min-h-full flex flex-col"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Complete Your Booking
          </h2>
          <button
            onClick={onBack}
            disabled={isProcessing}
            className="p-2 hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50"
            aria-label="Go back to contact form"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
        </div>

        <AnimatePresence>
          {paymentSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-green-800">
                    Payment Successful!
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Your booking has been confirmed. A confirmation email has been sent.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {paymentError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-red-800">Payment Failed</p>
                  <p className="text-xs text-red-700 mt-1">{paymentError}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service Summary */}
        <div className="bg-primary/5 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Service Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">{selectedServiceLabel}</span>
              <span className="text-sm font-semibold text-primary">
                ${selectedPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="quantity" className="text-sm text-foreground">
                Quantity:
              </label>
              <input
                id="quantity"
                type="number"
                name="quantity"
                value={paymentData.quantity}
                onChange={handleChange}
                min="1"
                disabled={isProcessing}
                className="w-20 px-3 py-1.5 rounded border border-border bg-background text-sm text-center focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
              />
            </div>
            <div className="border-t border-border/50 pt-3 flex justify-between items-center">
              <span className="font-semibold text-foreground">Total Price:</span>
              <span className="text-xl font-bold text-accent">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Contact Information Display */}
        <div className="bg-accent/5 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <p className="text-foreground">
              <span className="font-medium text-foreground/70">Name:</span>
              <br />
              {contactData.name}
            </p>
            <p className="text-foreground">
              <span className="font-medium text-foreground/70">Email:</span>
              <br />
              {contactData.email}
            </p>
            <p className="text-foreground">
              <span className="font-medium text-foreground/70">Phone:</span>
              <br />
              {contactData.phone}
            </p>
            {contactData.date && (
              <p className="text-foreground">
                <span className="font-medium text-foreground/70">Preferred Date:</span>
                <br />
                {contactData.date}
              </p>
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
            <label htmlFor="card-element" className="block text-sm font-semibold text-foreground mb-2">
              Card Details <span className="text-red-500">*</span>
            </label>
            <div className={`p-4 border-2 rounded-lg bg-background transition-colors ${
              cardError ? 'border-red-500' : 'border-border focus-within:border-primary'
            }`}>
              <CardElement
                id="card-element"
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
                  hidePostalCode: true,
                }}
                onChange={handleCardChange}
              />
            </div>
            {cardError && (
              <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {cardError}
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="notes" className="block text-sm font-semibold text-foreground mb-2">
              Special Requests
            </label>
            <textarea
              id="notes"
              name="notes"
              value={paymentData.notes}
              onChange={handleChange}
              disabled={isProcessing}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors resize-none text-sm disabled:opacity-50"
              rows={2}
              placeholder="Any special requests or notes for the technician..."
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
              disabled={isProcessing || !stripe || cardError !== null}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2.5 text-sm font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2 inline" />
                  Pay ${totalPrice.toFixed(2)}
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-center text-xs text-foreground/60 flex items-center justify-center gap-1">
            <Lock className="w-3.5 h-3.5" />
            Your payment information is secure and encrypted
          </p>
        </form>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-card rounded-lg p-6 sm:p-8 max-w-md w-full shadow-lg"
              >
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-4">
                  Confirm Your Payment
                </h3>

                <div className="bg-primary/5 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground/70">Service:</span>
                    <span className="text-sm font-semibold text-foreground">{selectedServiceLabel}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-foreground/70">Quantity:</span>
                    <span className="text-sm font-semibold text-foreground">{paymentData.quantity}</span>
                  </div>
                  <div className="border-t border-primary/10 pt-3 flex justify-between items-center">
                    <span className="text-sm font-semibold text-foreground">Total Amount:</span>
                    <span className="text-lg font-bold text-accent">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <p className="text-xs text-foreground/60 mb-6 text-center">
                  By clicking "Confirm Payment", you authorize the charge to your card.
                </p>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                    disabled={isProcessing}
                    className="flex-1 border border-border hover:bg-background text-foreground rounded-lg py-2 text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleProcessPayment}
                    disabled={isProcessing || !stripe}
                    className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg py-2 text-sm font-semibold transition-colors disabled:opacity-60"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin inline" />
                        Processing...
                      </>
                    ) : (
                      "Confirm Payment"
                    )}
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
