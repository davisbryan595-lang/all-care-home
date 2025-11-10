"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface ServiceModalProps {
  isOpen: boolean
  onClose: () => void
  service?: {
    icon: string
    title: string
    description: string
    image: string
    details?: string[]
  }
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!service) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors z-50"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>

            {/* Image Section */}
            <div className="relative h-64 md:h-80 w-full overflow-hidden bg-muted">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8">
              {/* Header */}
              <div className="mb-6">
                <div className="text-5xl mb-3">{service.icon}</div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{service.title}</h2>
                <p className="text-lg text-foreground/70">{service.description}</p>
              </div>

              {/* Details Section */}
              {service.details && service.details.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-4">What's Included</h3>
                  <ul className="space-y-3">
                    {service.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <span className="text-primary text-xl font-bold flex-shrink-0">✓</span>
                        <span className="text-foreground/80">{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 pt-6 border-t border-border"
              >
                <p className="text-foreground/70 text-sm mb-4">
                  Ready to get started with this service? Get a free quote today.
                </p>
                <button
                  onClick={() => {
                    onClose()
                    setTimeout(() => {
                      const element = document.querySelector("#contact")
                      if (element) element.scrollIntoView({ behavior: "smooth" })
                    }, 300)
                  }}
                  className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-semibold"
                >
                  Request Quote for {service.title}
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
