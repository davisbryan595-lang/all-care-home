"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import FlipCardForm from "@/components/flip-card-form"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function Contact() {

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

          {/* 3D Flip Card Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto px-2 sm:px-0"
          >
            <p className="text-center text-sm sm:text-base text-foreground/70 mb-6">
              💳 Flip the card to book and pay online
            </p>
            <FlipCardForm />
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
