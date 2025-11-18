"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface ServiceOption {
  value: string
  label: string
  price: number
}

interface PaymentFormBackProps {
  selectedService: string
  selectedPrice: number
  serviceOptions: ServiceOption[]
  onBack: () => void
}

export default function PaymentFormBack({
  selectedService,
  selectedPrice,
  serviceOptions,
  onBack,
}: PaymentFormBackProps) {
  const [paymentData, setPaymentData] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvc: "",
    quantity: 1,
    notes: "",
  })

  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const selectedServiceLabel =
    serviceOptions.find((s) => s.value === selectedService)?.label || ""

  const totalPrice = selectedPrice * paymentData.quantity

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let { name, value } = e.target

    if (name === "cardNumber") {
      value = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim()
    } else if (name === "expiryDate") {
      value = value.replace(/\D/g, "")
      if (value.length >= 2) {
        value = value.slice(0, 2) + "/" + value.slice(2, 4)
      }
    } else if (name === "cvc") {
      value = value.replace(/\D/g, "").slice(0, 3)
    } else if (name === "quantity") {
      value = Math.max(1, parseInt(value) || 1).toString()
    }

    setPaymentData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: selectedService,
          serviceLabel: selectedServiceLabel,
          amount: totalPrice,
          quantity: paymentData.quantity,
          ...paymentData,
        }),
      })

      if (response.ok) {
        setPaymentSuccess(true)
        setTimeout(() => {
          setPaymentSuccess(false)
          onBack()
          setPaymentData({
            name: "",
            email: "",
            phone: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            quantity: 1,
            notes: "",
          })
        }, 3000)
      } else {
        console.error("Payment failed")
      }
    } catch (error) {
      console.error("Error processing payment:", error)
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
            aria-label="Go back"
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
              ✅ Payment successful! Booking confirmed.
            </p>
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

        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={paymentData.name}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
              placeholder="Your name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={paymentData.email}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
              placeholder="your@email.com"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={paymentData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
              placeholder="(403) 555-1234"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Card Number *
            </label>
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm placeholder-gray-400"
              placeholder="1234 5678 9012 3456"
              maxLength="19"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
                Expiry Date *
              </label>
              <input
                type="text"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
                placeholder="MM/YY"
                maxLength="5"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
                CVC *
              </label>
              <input
                type="text"
                name="cvc"
                value={paymentData.cvc}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
                placeholder="123"
                maxLength="3"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
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
            transition={{ delay: 0.35 }}
            className="pt-2"
          >
            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-2.5 text-sm font-semibold"
            >
              {isProcessing ? "Processing..." : `Pay $${totalPrice}`}
            </Button>
          </motion.div>

          <p className="text-center text-xs text-foreground/70">
            Your payment information is secure
          </p>
        </form>
      </motion.div>
    </div>
  )
}
