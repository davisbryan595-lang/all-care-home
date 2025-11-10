"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Preloader } from "@/components/preloader"
import { AnimatedCounter } from "@/components/animated-counter"
import { ServiceCard } from "@/components/service-card"
import { Carousel } from "@/components/carousel"
import { Gallery } from "@/components/gallery"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Clock, Heart, Award, Users, Shield, Check } from "lucide-react"
import { useState } from "react"
import type React from "react"

const services = [
  {
    icon: "🔨",
    title: "Small Carpentry Repairs",
    description: "Expert door, trim, and shelving repairs",
    image: "https://images.pexels.com/photos/6473973/pexels-photo-6473973.jpeg",
    details: ["Door repairs", "Trim work", "Shelving installation"],
  },
  {
    icon: "🎨",
    title: "Drywall Patching & Painting",
    description: "Professional wall finishing and painting",
    image: "https://images.pexels.com/photos/6474300/pexels-photo-6474300.jpeg",
    details: ["Drywall patching", "Wall painting", "Texture application"],
  },
  {
    icon: "💡",
    title: "Fixture Replacements",
    description: "Install lights, faucets, and more",
    image: "https://images.pexels.com/photos/5691531/pexels-photo-5691531.jpeg",
    details: ["Light fixtures", "Faucets", "Ceiling fans"],
  },
  {
    icon: "🛠️",
    title: "Furniture Assembly & Odd Jobs",
    description: "Assemble anything or handle odd tasks",
    image: "https://images.pexels.com/photos/5217124/pexels-photo-5217124.jpeg",
    details: ["Furniture assembly", "Odd jobs", "Small projects"],
  },
  {
    icon: "🍂",
    title: "Seasonal Maintenance",
    description: "Keep your home ready year-round",
    image: "https://images.pexels.com/photos/11229483/pexels-photo-11229483.jpeg",
    details: ["Gutter cleaning", "Snow removal", "Weatherproofing"],
  },
  {
    icon: "✨",
    title: "House Cleaning",
    description: "Professional cleaning at $20/hour",
    image: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg",
    details: ["General cleaning", "Post-repair cleanup", "Deep cleaning"],
  },
]

const heroCarouselItems = [
  {
    id: "1",
    image: "https://images.pexels.com/photos/6473973/pexels-photo-6473973.jpeg",
    title: "Expert Home Repairs",
  },
  {
    id: "2",
    image: "https://images.pexels.com/photos/6474300/pexels-photo-6474300.jpeg",
    title: "Quality Painting & Drywall",
  },
  {
    id: "3",
    image: "https://images.pexels.com/photos/5217124/pexels-photo-5217124.jpeg",
    title: "Furniture Assembly & More",
  },
]

export default function Home() {
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

    setTimeout(() => {
      setSubmitted(true)
      setIsLoading(false)
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
    }, 1500)
  }

  return (
    <>
      <Preloader />
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="h-96 md:h-[600px] lg:h-[700px]">
          <Carousel items={heroCarouselItems} autoPlay autoPlayInterval={5000} />
        </div>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center text-white max-w-3xl mx-auto px-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance">RELIABLE LOCAL AFFORDABLE</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">Need a hand around the house?</p>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
              With over 15 years of experience, All Care Home Repair provides trusted, affordable home maintenance and
              repair services to homeowners and seniors across Cochrane, Ontario.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const element = document.querySelector("#services")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-semibold text-lg"
              >
                View Services
              </button>
              <button
                onClick={() => {
                  const element = document.querySelector("#contact")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
                className="px-8 py-3 border-2 border-white text-white hover:bg-white/20 bg-transparent rounded-lg transition-colors font-semibold text-lg"
              >
                Get Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-primary/10 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 text-foreground"
          >
            Why Choose All Care?
          </motion.h2>

          <div className="grid md:grid-cols-4 gap-8">
            <AnimatedCounter target={15} label="Years Experience" />
            <AnimatedCounter target={1000} label="Happy Homes Served" />
            <AnimatedCounter target={100} label="Senior-Friendly Projects" suffix="+" />
            <AnimatedCounter target={500} label="No Job Too Small" suffix="+" />
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-accent text-accent-foreground py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="text-2xl"
            >
              ☎️
            </motion.span>
            <p className="text-xl md:text-2xl font-bold">Seniors & First-Time Customers Get 10% OFF</p>
          </div>
          <p className="text-lg opacity-90">Call today to claim your exclusive discount!</p>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">Our Services</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              From small repairs to complete projects, we handle it all with professionalism and care
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="space-y-4">
              <p className="text-lg text-foreground/70 leading-relaxed">
                All Care Home Repair was founded on a simple principle: homeowners deserve honest, reliable service at
                fair prices. Whether you're a busy professional, a senior looking for trustworthy help, or anyone in
                between, we're here to take the stress out of home repairs.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                With over 15 years of hands-on experience, our team has completed thousands of repairs across Cochrane
                and the surrounding areas. We believe that quality craftsmanship, respect for your home, and genuine
                care are the foundations of a great service business.
              </p>
              <p className="text-lg text-foreground/70 leading-relaxed">
                Today, we're proud to serve families, seniors, and businesses who value reliability and fair pricing.
                And we're still growing, thanks to customers like you.
              </p>
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold text-foreground mb-8">Why Choose Us</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, title: "15+ Years Experience", desc: "Proven track record of quality work" },
                { icon: Users, title: "Local & Dependable", desc: "Serving Cochrane families since 2010" },
                { icon: Heart, title: "Senior-Friendly", desc: "Special care and respect for our elders" },
                { icon: Shield, title: "Fully Insured", desc: "Licensed and insured for your peace of mind" },
              ].map((item, idx) => {
                const Icon = item.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-primary/5 rounded-lg p-6 text-center"
                  >
                    <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-foreground/70 text-sm">{item.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Our Values</h3>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Honesty",
                  desc: "Transparent pricing, no hidden fees, no upselling. You get exactly what we quote.",
                },
                {
                  title: "Quality",
                  desc: "We stand behind our work. Every project is done right, the first time.",
                },
                {
                  title: "Care",
                  desc: "We treat your home like our own, respecting your space and your time.",
                },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-primary/10 rounded-lg p-6"
                >
                  <h4 className="text-2xl font-bold text-foreground mb-3">{value.title}</h4>
                  <p className="text-foreground/70 text-lg">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-primary/5 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { emoji: "👴", text: "Seniors Welcome" },
              { emoji: "🔒", text: "Fully Insured" },
              { emoji: "✅", text: "Satisfaction Guaranteed" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-3">{badge.emoji}</div>
                <p className="font-semibold text-foreground">{badge.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-foreground mb-12"
          >
            Transparent & Affordable
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-card border-2 border-accent rounded-lg p-8 md:p-12 shadow-lg"
          >
            <div className="text-center mb-12">
              <h3 className="text-5xl font-bold text-foreground mb-3">
                Only <span className="text-primary">$50</span>/hour
              </h3>
              <p className="text-2xl text-accent font-semibold mb-4">2-hour minimum</p>
              <p className="text-foreground/70 text-lg">Professional service at fair market rates</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="text-xl font-bold text-foreground mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {[
                    "Professional expertise",
                    "All basic tools & materials",
                    "Fully insured service",
                    "Clean up after work",
                    "Friendly, reliable service",
                    "Background-checked technician",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xl font-bold text-foreground mb-4">Special Discounts</h4>
                <ul className="space-y-3">
                  {[
                    "10% discount for seniors (65+)",
                    "10% discount for first-time customers",
                    "Combine both discounts up to 20% off",
                    "Volume pricing available",
                    "Seasonal service packages",
                    "Loyalty rewards program",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="text-accent text-xl">⭐</span>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <button
                onClick={() => {
                  const element = document.querySelector("#contact")
                  if (element) element.scrollIntoView({ behavior: "smooth" })
                }}
                className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors font-semibold text-lg"
              >
                Book Your 2-Hour Slot
              </button>
            </motion.div>
          </motion.div>

          {/* Savings Counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <h3 className="text-3xl font-bold mb-4 text-foreground">
              Seniors Save <span className="text-accent">$10-$20</span> Per Hour
            </h3>
            <p className="text-lg text-foreground/70 mb-8">
              With our senior discount, a 2-hour job costs just $80-$90 instead of $100
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedCounter target={15} label="Seniors Served This Month" suffix="+" />
              <AnimatedCounter target={20} label="Average Savings Per Job" suffix="%" />
              <AnimatedCounter target={100} label="Satisfaction Rate" suffix="%" />
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h3 className="text-3xl font-bold text-center text-foreground mb-8">Common Questions</h3>

            <div className="space-y-6">
              {[
                {
                  q: "Is the 2-hour minimum for the same job?",
                  a: "Yes, we offer a 2-hour minimum per visit. You can complete multiple jobs in those hours.",
                },
                {
                  q: "Do you charge for travel?",
                  a: "No additional travel charges within Cochrane. We believe in transparent, fair pricing.",
                },
                {
                  q: "What if the job takes less than 2 hours?",
                  a: "You still pay the 2-hour minimum, but we'll use that time to complete additional small tasks if available.",
                },
                {
                  q: "Do materials cost extra?",
                  a: "Basic materials are included. If your project requires special or premium materials, we'll discuss that upfront.",
                },
              ].map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-primary/5 rounded-lg p-6"
                >
                  <h4 className="font-bold text-foreground mb-2 text-lg">{faq.q}</h4>
                  <p className="text-foreground/70">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center text-foreground mb-4 text-balance"
          >
            Get Your Free Quote in Minutes
          </motion.h2>
          <p className="text-center text-xl text-foreground/70 mb-12">
            No obligation, no pressure. Just honest service.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Contact Info Cards */}
            {[
              {
                icon: Phone,
                title: "Phone",
                content: "+1 (403) 555-1234",
                action: "tel:+14035551234",
              },
              {
                icon: Mail,
                title: "Email",
                content: "info@allcarerepair.com",
                action: "mailto:info@allcarerepair.com",
              },
              {
                icon: MapPin,
                title: "Location",
                content: "Cochrane, Ontario, Canada",
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
                  className="bg-background rounded-lg p-6 text-center hover:shadow-lg transition-all"
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
            <h3 className="text-3xl font-bold text-foreground mb-8 text-center">Request a Quote</h3>

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
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
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
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors"
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
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:border-primary focus:outline-none transition-colors resize-none"
                  rows={5}
                  placeholder="Tell us about your project or any special requirements..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg font-semibold rounded-lg transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Get Your Free Quote"}
                </button>
              </motion.div>

              <p className="text-center text-sm text-foreground/70">
                We'll respond to your inquiry within 2 hours during business hours
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Fix Something Today?</h2>
          <p className="text-lg mb-8 opacity-90">Join over 1000 happy homeowners who trust All Care Home Repair</p>
          <button
            onClick={() => {
              const element = document.querySelector("#contact")
              if (element) element.scrollIntoView({ behavior: "smooth" })
            }}
            className="px-8 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors font-semibold text-lg"
          >
            Get Your Free Quote
          </button>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
