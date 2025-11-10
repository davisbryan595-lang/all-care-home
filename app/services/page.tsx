"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ServiceCard } from "@/components/service-card"
import { Carousel } from "@/components/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: "🔨",
    title: "Small Carpentry Repairs",
    description: "Professional door repairs, trim work, and shelving installation",
    image: "/carpentry-wood-repairs.jpg",
    details: ["Door repairs & adjustments", "Trim installation", "Shelving & brackets", "Wood finishing"],
  },
  {
    icon: "🎨",
    title: "Drywall Patching & Painting",
    description: "Expert wall finishing and professional painting services",
    image: "/drywall-repair-painting-walls.jpg",
    details: ["Hole & damage repair", "Texture application", "Interior painting", "Primer & topcoat"],
  },
  {
    icon: "💡",
    title: "Fixture Replacements",
    description: "Install new lights, faucets, fans, and other fixtures",
    image: "/fixture-installation-lighting-bathroom.jpg",
    details: ["Light fixture installation", "Ceiling fan replacement", "Faucet upgrades", "Outlet updates"],
  },
  {
    icon: "🛠️",
    title: "Furniture Assembly & Odd Jobs",
    description: "Assemble anything or handle those odd jobs around the house",
    image: "/furniture-assembly-ikea-shelves.jpg",
    details: ["IKEA & flat-pack assembly", "Custom projects", "Small renovations", "General repairs"],
  },
  {
    icon: "🍂",
    title: "Seasonal Maintenance",
    description: "Keep your home ready for every season",
    image: "/gutter-cleaning-roof-maintenance.jpg",
    details: ["Gutter cleaning", "Snow removal", "Weatherproofing", "Winterization"],
  },
  {
    icon: "✨",
    title: "House Cleaning",
    description: "Professional cleaning services at $20/hour",
    image: "/house-cleaning-professional-service.jpg",
    details: ["General cleaning", "Post-repair cleanup", "Deep cleaning", "Window washing"],
  },
]

const carouselItems = [
  {
    id: "1",
    image: "/placeholder.svg?height=500&width=1200",
    title: "Expert Craftsmanship",
    subtitle: "Quality repairs you can trust",
  },
  {
    id: "2",
    image: "/placeholder.svg?height=500&width=1200",
    title: "Beautiful Results",
    subtitle: "Transform your space",
  },
  {
    id: "3",
    image: "/placeholder.svg?height=500&width=1200",
    title: "Fully Equipped",
    subtitle: "We bring everything we need",
  },
]

export default function Services() {
  return (
    <>
      <Navbar />

      {/* Hero Carousel */}
      <section className="pt-20 md:pt-32 pb-8">
        <Carousel items={carouselItems} autoPlay autoPlayInterval={5000} />
      </section>

      {/* Hero Text */}
      <section className="py-12 md:py-16 bg-primary/5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">No Job Is Too Small</h1>
          <p className="text-xl text-foreground/70">
            Whatever you need fixed, we're here to help with professionalism and care
          </p>
        </motion.div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Fully Equipped", desc: "We bring all necessary tools and materials" },
              { title: "Flexible Scheduling", desc: "Available Mon-Sat, early morning to evening" },
              { title: "Trusted Locally", desc: "Serving Cochrane for over 15 years" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="mb-3 animate-pulse">
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto flex items-center justify-center">
                    <span className="text-2xl">✨</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{stat.title}</h3>
                <p className="text-foreground/70">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent text-accent-foreground py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Request Your Service Today</h2>
          <Button asChild size="lg" className="bg-foreground hover:bg-foreground/90 text-accent">
            <Link href="/contact">Get Started</Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
