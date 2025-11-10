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
      <div className="relative h-48 w-full overflow-hidden bg-primary/10">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-foreground/70 mb-4 text-sm">{description}</p>

        {details && (
          <ul className="space-y-2 mb-4">
            {details.map((detail, idx) => (
              <li key={idx} className="text-sm text-foreground/60 flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={onLearnMore}
          className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors font-medium"
        >
          Learn More
        </button>
      </div>
    </motion.div>
  )
}
