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

      {/* Pricing Cards */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cleaning Services Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Cleaning Services Pricing</h2>
            <div className="bg-card border-2 border-accent rounded-lg p-8 md:p-12 shadow-lg">
              <div className="text-center mb-12">
                <p className="text-2xl text-accent font-semibold mb-4">Professional house cleaning service</p>
                <p className="text-foreground/70 text-lg">Fair pricing with exceptional results</p>
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

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <div className="bg-primary/5 rounded-lg p-6 text-center">
                  <p className="text-3xl font-bold text-accent mb-2">$85</p>
                  <h4 className="font-bold text-foreground mb-2">Basic Shine</h4>
                  <p className="text-sm text-foreground/70">Up to 2 hours</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-6 text-center border-2 border-accent">
                  <p className="text-3xl font-bold text-accent mb-2">$160</p>
                  <h4 className="font-bold text-foreground mb-2">Deep Clean Deluxe</h4>
                  <p className="text-sm text-foreground/70">Up to 4 hours</p>
                </div>
                <div className="bg-primary/5 rounded-lg p-6 text-center">
                  <p className="text-3xl font-bold text-accent mb-2">$220</p>
                  <h4 className="font-bold text-foreground mb-2">Move-In/Out</h4>
                  <p className="text-sm text-foreground/70">Full service</p>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center"
              >
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/contact">Book Cleaning Service</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Handyman Services Pricing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Handyman Services Pricing</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card border-2 border-primary rounded-lg p-8 md:p-10 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3">Standard Handyman</h3>
                  <p className="text-4xl font-bold text-primary mb-2">$60<span className="text-lg">/hr</span></p>
                  <p className="text-foreground/70 font-semibold">2-hour minimum ($120)</p>
                </div>

                <h4 className="font-bold text-foreground mb-4">Includes:</h4>
                <ul className="space-y-3 mb-8">
                  {[
                    "Door repairs & adjustments",
                    "Fixture installations",
                    "Furniture assembly",
                    "General repairs",
                    "Shelving installation",
                    "Small maintenance jobs",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/contact">Request Standard Service</Link>
                </Button>
              </div>

              <div className="bg-card border-2 border-accent rounded-lg p-8 md:p-10 shadow-lg">
                <div className="text-center mb-8">
                  <div className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold mb-4">POPULAR</div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Premium Handyman</h3>
                  <p className="text-4xl font-bold text-accent mb-2">$75<span className="text-lg">/hr</span></p>
                  <p className="text-foreground/70 font-semibold">2-hour minimum ($150)</p>
                </div>

                <h4 className="font-bold text-foreground mb-4">Includes Everything in Standard, Plus:</h4>
                <ul className="space-y-3 mb-8">
                  {[
                    "Drywall repair & finishing",
                    "Interior painting",
                    "Plumbing basics",
                    "Carpentry work",
                    "Ceiling fan installation",
                    "Complex repairs & custom projects",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>

                <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/contact">Request Premium Service</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Savings & Benefits */}
      <section className="bg-primary/10 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold mb-12 text-foreground text-center">
            Great <span className="text-accent">Discounts</span> & Benefits
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-background rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-3">👴</div>
              <h3 className="font-bold text-foreground mb-2">Senior Discounts</h3>
              <p className="text-foreground/70">10% off for seniors (65+), up to 20% with first-time discount</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-background rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-3">🎁</div>
              <h3 className="font-bold text-foreground mb-2">First-Time Customer</h3>
              <p className="text-foreground/70">Special 10% discount on your first service booking</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-background rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="font-bold text-foreground mb-2">Loyalty Program</h3>
              <p className="text-foreground/70">Volume pricing and recurring service discounts available</p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <AnimatedCounter target={15} label="Seniors Served This Month" suffix="+" />
            <AnimatedCounter target={20} label="Average Savings Per Job" suffix="%" />
            <AnimatedCounter target={100} label="Satisfaction Rate" suffix="%" />
          </div>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Common Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: "Is the 2-hour minimum for cleaning and handyman services?",
                a: "Yes, both cleaning and handyman services have a 2-hour minimum per visit. You can complete multiple jobs in those hours.",
              },
              {
                q: "Do you charge for travel?",
                a: "No additional travel charges within Cochrane and surrounding areas. We believe in transparent, fair pricing.",
              },
              {
                q: "What's the difference between Standard and Premium Handyman?",
                a: "Standard handles basic repairs, fixtures, and assembly. Premium includes drywall, painting, plumbing, carpentry, and complex projects.",
              },
              {
                q: "Are materials included in the handyman pricing?",
                a: "Basic tools and materials are included. For special or premium materials, we'll provide an estimate upfront before proceeding.",
              },
              {
                q: "How do the senior discounts work?",
                a: "Seniors get 10% off. First-time customers also get 10% off. These can be combined for up to 20% total savings.",
              },
              {
                q: "Can I combine cleaning and handyman services?",
                a: "Absolutely! Many customers book both services. We'll ensure efficient scheduling and coordinate the work seamlessly.",
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
