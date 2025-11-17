"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "general",
    date: "",
    time: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const accessKey = "551cee39c731b8fbd09b8bfeb8b47b02d5adff973b7ad799d3e0a7b1083f026d"
      const response = await fetch("https://api.silentforms.com/v1/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          to_email: "blkchild1970@gmail.com",
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          date: formData.date,
          time: formData.time,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "general",
          date: "",
          time: "",
          message: "",
        })

        setTimeout(() => setSubmitted(false), 5000)
      } else {
        console.error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-20 md:pt-32 pb-12">
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden mx-4 sm:mx-6 lg:mx-8">
          <img src="/placeholder.svg?height=500&width=1200" alt="Contact" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl font-bold mb-4">Get Your Free Quote in Minutes</h1>
              <p className="text-xl">No obligation, no pressure. Just honest service.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            {[
              {
                icon: Phone,
                title: "Phone",
                content: "705-274-9433",
                action: "tel:705-274-9433",
              },
              {
                icon: Mail,
                title: "Email",
                content: "allcarerepairservices@outlook.com",
                action: "mailto:allcarerepairservices@outlook.com",
              },
              {
                icon: MapPin,
                title: "Location",
                content: "9 6th St, Cochrane, Ontario",
                action: "#",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.a
                  key={idx}
                  href={item.action}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-primary/10 rounded-lg p-6 text-center glow-accent hover:glow-accent transition-all"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.content}</p>
                </motion.a>
              )
            })}
          </div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-accent text-accent-foreground rounded-lg p-8 text-center mb-16"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Clock className="w-6 h-6" />
              <h3 className="text-2xl font-bold">Hours of Operation</h3>
            </div>
            <p className="text-lg">Monday - Saturday: 8:00 AM - 6:00 PM</p>
            <p className="text-lg">Sunday: By appointment only</p>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Request a Quote</h2>

            {submitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-primary/10 border-2 border-primary rounded-lg p-6 mb-8 text-center"
              >
                <p className="text-lg font-semibold text-primary">
                  ✅ Thank you! We'll contact you shortly to confirm your appointment.
                </p>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors"
                    placeholder="(403) 555-1234"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">Service Type *</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="drywall">Drywall & Painting</option>
                    <option value="fixtures">Fixture Replacement</option>
                    <option value="assembly">Assembly & Odd Jobs</option>
                    <option value="maintenance">Seasonal Maintenance</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-foreground mb-2">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <label className="block text-sm font-medium text-foreground mb-2">Additional Details</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:outline-none transition-colors resize-none"
                  rows={5}
                  placeholder="Tell us about your project or any special requirements..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold"
                >
                  {isLoading ? "Sending..." : "Get Your Free Quote"}
                </Button>
              </motion.div>

              <p className="text-center text-sm text-foreground/70">
                We'll respond to your inquiry within 2 hours during business hours
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-primary/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { emoji: "👴", text: "Seniors Welcome" },
              { emoji: "🔒", text: "No Hidden Fees" },
              { emoji: "✅", text: "Fully Insured" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="text-5xl mb-2">{badge.emoji}</div>
                <p className="font-semibold text-foreground">{badge.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
