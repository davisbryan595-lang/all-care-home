"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Preloader } from "@/components/preloader"
import { AnimatedCounter } from "@/components/animated-counter"
import { ServiceCard } from "@/components/service-card"
import { Carousel } from "@/components/carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: "🔨",
    title: "Small Carpentry Repairs",
    description: "Expert door, trim, and shelving repairs",
    image: "/carpentry-repairs-tools-workbench.jpg",
    details: ["Door repairs", "Trim work", "Shelving installation"],
  },
  {
    icon: "🎨",
    title: "Drywall Patching & Painting",
    description: "Professional wall finishing and painting",
    image: "/drywall-painting-interior-walls.jpg",
    details: ["Drywall patching", "Wall painting", "Texture application"],
  },
  {
    icon: "💡",
    title: "Fixture Replacements",
    description: "Install lights, faucets, and more",
    image: "/fixture-replacement-plumbing-electrical.jpg",
    details: ["Light fixtures", "Faucets", "Ceiling fans"],
  },
  {
    icon: "🛠️",
    title: "Furniture Assembly & Odd Jobs",
    description: "Assemble anything or handle odd tasks",
    image: "/furniture-assembly-home-tasks.jpg",
    details: ["Furniture assembly", "Odd jobs", "Small projects"],
  },
  {
    icon: "🍂",
    title: "Seasonal Maintenance",
    description: "Keep your home ready year-round",
    image: "/seasonal-home-maintenance-gutters.jpg",
    details: ["Gutter cleaning", "Snow removal", "Weatherproofing"],
  },
  {
    icon: "✨",
    title: "House Cleaning",
    description: "Professional cleaning at $20/hour",
    image: "/professional-house-cleaning-interior.jpg",
    details: ["General cleaning", "Post-repair cleanup", "Deep cleaning"],
  },
]

const heroCarouselItems = [
  {
    id: "1",
    image: "/handyman-fixing-wooden-door-repairs.jpg",
    title: "Expert Door Repairs",
  },
  {
    id: "2",
    image: "/interior-wall-painting-professional-service.jpg",
    title: "Quality Painting & Drywall",
  },
  {
    id: "3",
    image: "/furniture-assembly-living-room-workspace.jpg",
    title: "Furniture Assembly & More",
  },
]

export default function Home() {
  return (
    <>
      <Preloader />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
        <Carousel items={heroCarouselItems} autoPlay autoPlayInterval={5000} />

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
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/services">View Services</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/20 bg-transparent"
              >
                <Link href="/contact">Get Quote</Link>
              </Button>
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
      <section className="py-16 md:py-24 bg-background">
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

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/services">Explore All Services</Link>
            </Button>
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

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Ready to Fix Something Today?</h2>
          <p className="text-lg mb-8 opacity-90">Get a free quote in minutes. No obligation, no pressure.</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">Get Your Free Quote</Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
