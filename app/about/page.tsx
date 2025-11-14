"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Award, Users, Shield } from "lucide-react"

export default function About() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-primary/5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Taking Care of Your Home, One Project at a Time
          </h1>
          <p className="text-xl text-foreground/70">
            Since 2010, All Care Home Repair has been the trusted choice for Cochrane homeowners
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
                All Care Home Services was founded by Ian Emans on a simple principle: homeowners deserve honest, reliable service at
                fair prices. Whether you're a busy professional, a senior looking for trustworthy help, or anyone in
                between, we're here to take the stress out of home repairs.
              </p>
              <p className="text-lg text-foreground/70 mb-4 leading-relaxed">
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
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center text-foreground mb-16"
          >
            Why Choose Us
          </motion.h2>

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
                  className="bg-card rounded-lg p-6 text-center glow-accent"
                >
                  <Icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-foreground mb-12">Our Values</h2>

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
                  <h3 className="text-2xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-foreground/70 text-lg">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-accent text-accent-foreground py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Join Our Growing Family of Happy Homeowners</h2>
          <Button asChild size="lg" className="bg-foreground hover:bg-foreground/90 text-accent">
            <Link href="/contact">Get Started Today</Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
