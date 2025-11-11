"use client"

import { motion } from "framer-motion"

interface ServiceCardProps {
  icon: string
  title: string
  description: string
  image: string
  details?: string[]
  index?: number
  onLearnMore?: () => void
}

export function ServiceCard({ icon, title, description, image, details, index = 0, onLearnMore }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-card rounded-lg overflow-hidden shadow-lg border border-border glow-accent hover:glow-accent transition-all duration-300"
    >
      <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-primary/10">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-4 sm:p-6">
        <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{icon}</div>
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2">{title}</h3>
        <p className="text-xs sm:text-sm text-foreground/70 mb-3 sm:mb-4">{description}</p>

        {details && (
          <ul className="space-y-1 sm:space-y-2 mb-4">
            {details.map((detail, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-foreground/60 flex items-start gap-2">
                <span className="text-primary mt-0.5 sm:mt-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onLearnMore}
          className="w-full px-3 sm:px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors font-medium text-xs sm:text-sm"
        >
          Learn More
        </button>
      </div>
    </motion.div>
  )
}
