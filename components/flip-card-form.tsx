"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import ContactFormFront from "./flip-card-contact-form"
import PaymentFormBack from "./flip-card-payment-form"

export default function FlipCardForm() {
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [selectedPrice, setSelectedPrice] = useState(0)

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

  const handleServiceSelect = (value: string, price: number) => {
    setSelectedService(value)
    setSelectedPrice(price)
    setIsFlipped(true)
  }

  const handleBackClick = () => {
    setIsFlipped(false)
  }

  return (
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
            onBack={handleBackClick}
          />
        </div>
      </motion.div>

      <style jsx>{`
        .flip-card-container {
          perspective: 1000px;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
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
