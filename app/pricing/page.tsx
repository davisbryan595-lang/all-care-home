"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AnimatedCounter } from "@/components/animated-counter"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Link from "next/link"

export default function Pricing() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-20 md:pt-32 pb-12">
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden">
          <img src="/placeholder.svg?height=500&width=1200" alt="Pricing" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h1 className="text-5xl font-bold mb-4">Transparent & Affordable</h1>
              <p className="text-xl">No Hidden Fees, Just Fair Pricing</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-card border-2 border-accent rounded-lg p-8 md:p-12 shadow-lg glow-accent"
          >
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-foreground mb-3">
                Only <span className="text-primary">$50</span>/hour
              </h2>
              <p className="text-2xl text-accent font-semibold mb-4">2-hour minimum</p>
              <p className="text-foreground/70 text-lg">Professional service at fair market rates</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">What's Included</h3>
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
                <h3 className="text-xl font-bold text-foreground mb-4">Special Discounts</h3>
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
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">Book Your 2-Hour Slot</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Savings Counter */}
      <section className="bg-primary/10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Seniors Save <span className="text-accent">$10-$20</span> Per Hour
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            With our senior discount, a 2-hour job costs just $80-$90 instead of $100
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <AnimatedCounter target={15} label="Seniors Served This Month" suffix="+" />
            <AnimatedCounter target={20} label="Average Savings Per Job" suffix="%" />
            <AnimatedCounter target={100} label="Satisfaction Rate" suffix="%" />
          </div>
        </motion.div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Common Questions</h2>

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
                <h3 className="font-bold text-foreground mb-2 text-lg">{faq.q}</h3>
                <p className="text-foreground/70">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">Schedule your service today and experience the All Care difference</p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/contact">Request A Quote Now</Link>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </>
  )
}
