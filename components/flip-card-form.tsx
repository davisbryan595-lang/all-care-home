"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import ContactFormFront from "./flip-card-contact-form"
import PaymentFormBack from "./flip-card-payment-form"

export default function FlipCardForm() {
  const [activeTab, setActiveTab] = useState<"contact" | "payment">("contact")
  const [selectedService, setSelectedService] = useState("")
  const [selectedPrice, setSelectedPrice] = useState(0)
  const [contactData, setContactData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  })

  const serviceOptions = [
    { value: "basic", label: "Basic Shine Package", price: 85 },
    { value: "deluxe", label: "Deep Clean Deluxe", price: 160 },
    { value: "moveout", label: "Move-In / Move-Out", price: 220 },
    { value: "carpet", label: "Carpet Shampoo", price: 40 },
    { value: "windows", label: "Window Cleaning", price: 50 },
    { value: "carpentry", label: "Carpentry & Repairs", price: 60 },
    { value: "drywall", label: "Drywall & Painting", price: 75 },
    { value: "fixtures", label: "Fixtures & Electrical", price: 75 },
    { value: "assembly", label: "Furniture Assembly", price: 60 },
    { value: "plumbing", label: "Plumbing Basics", price: 60 },
    { value: "seasonal", label: "Seasonal Maintenance", price: 75 },
  ]

  const handleTabClick = (tab: "contact" | "payment") => {
    setActiveTab(tab)
  }

  const handleServiceSelect = (value: string, price: number, formData: any) => {
    setSelectedService(value)
    setSelectedPrice(price)
    setContactData(formData)
    setActiveTab("payment")
  }

  const handleBackToContact = () => {
    setActiveTab("contact")
  }

  const isFlipped = activeTab === "payment"

  return (
    <div className="flip-card-wrapper">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 bg-primary/5 p-2 rounded-lg">
        <button
          onClick={() => handleTabClick("contact")}
          role="tab"
          aria-selected={activeTab === "contact"}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            activeTab === "contact"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-primary/10"
          }`}
        >
          📋 Contact Form
        </button>
        <button
          onClick={() => handleTabClick("payment")}
          role="tab"
          aria-selected={activeTab === "payment"}
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
            activeTab === "payment"
              ? "bg-accent text-accent-foreground"
              : "text-foreground hover:bg-accent/10"
          }`}
        >
          💳 Payment Form
        </button>
      </div>

      {/* 3D Flip Card */}
      <div className="flip-card-container">
        <motion.div
          className="flip-card-inner"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front Side - Contact Form */}
          <div
            className="flip-card-front"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            <ContactFormFront
              serviceOptions={serviceOptions}
              onServiceSelect={handleServiceSelect}
              isFlipped={isFlipped}
            />
          </div>

          {/* Back Side - Payment Form */}
          <div
            className="flip-card-back"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <PaymentFormBack
              selectedService={selectedService}
              selectedPrice={selectedPrice}
              serviceOptions={serviceOptions}
              onBack={handleBackToContact}
              contactData={contactData}
            />
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .flip-card-wrapper {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }

        .flip-card-container {
          perspective: 1000px;
          width: 100%;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          min-height: 650px;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          width: 100%;
          min-height: 650px;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        @media (max-width: 640px) {
          .flip-card-inner {
            min-height: auto;
          }

          .flip-card-front,
          .flip-card-back {
            min-height: auto;
          }
        }
      `}</style>
    </div>
  )
}
