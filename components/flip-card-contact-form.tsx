"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface ServiceOption {
  value: string
  label: string
  price: number
}

interface ContactFormFrontProps {
  serviceOptions: ServiceOption[]
  onServiceSelect: (value: string, price: number) => void
  isFlipped: boolean
}

export default function ContactFormFront({
  serviceOptions,
  onServiceSelect,
  isFlipped,
}: ContactFormFrontProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          date: "",
          message: "",
        })

        setTimeout(() => setSubmitted(false), 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBookAndPay = () => {
    if (formData.service) {
      const selected = serviceOptions.find((s) => s.value === formData.service)
      if (selected) {
        onServiceSelect(selected.value, selected.price)
      }
    }
  }

  return (
    <div className="flip-card-contact-content">
      <motion.div
        initial={isFlipped ? { opacity: 0 } : { opacity: 1 }}
        animate={isFlipped ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-card rounded-lg p-6 sm:p-8 min-h-full"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 text-center">
          Get Your Free Quote
        </h2>
        <p className="text-center text-sm text-foreground/70 mb-6">
          Fill in your details and select a service
        </p>

        {submitted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-primary/10 border-2 border-primary rounded-lg p-4 mb-6 text-center"
          >
            <p className="text-sm font-semibold text-primary">
              ✅ Thank you! We'll contact you shortly.
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={formData.name}
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
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
              placeholder="(403) 555-1234"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
              placeholder="your@email.com"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Select Service *
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
            >
              <option value="">Choose a service...</option>
              <optgroup label="Cleaning Services">
                {serviceOptions.slice(0, 5).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - ${option.price}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Handyman Services">
                {serviceOptions.slice(5).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - ${option.price}/hr
                  </option>
                ))}
              </optgroup>
            </select>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors text-sm"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-xs sm:text-sm font-medium text-foreground mb-1.5">
              Additional Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-2.5 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors resize-none text-sm"
              rows={3}
              placeholder="Tell us about your project..."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex gap-3 pt-2"
          >
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 text-sm font-semibold"
            >
              {isLoading ? "Sending..." : "Get Quote"}
            </Button>
            <Button
              type="button"
              onClick={handleBookAndPay}
              disabled={!formData.service}
              className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground py-2.5 text-sm font-semibold"
            >
              Book & Pay
            </Button>
          </motion.div>

          <p className="text-center text-xs text-foreground/70">
            or flip the card to book and pay online
          </p>
        </form>
      </motion.div>
    </div>
  )
}
