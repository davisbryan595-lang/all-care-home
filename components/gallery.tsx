"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X } from "lucide-react"

interface GalleryImage {
  id: string
  src: string
  alt: string
  category: string
}

const galleryImages: GalleryImage[] = [
  {
    id: "1",
    src: "https://images.pexels.com/photos/6473973/pexels-photo-6473973.jpeg",
    alt: "Professional construction and measurement work",
    category: "carpentry",
  },
  {
    id: "2",
    src: "https://images.pexels.com/photos/5691531/pexels-photo-5691531.jpeg",
    alt: "Professional window and door installation",
    category: "fixtures",
  },
  {
    id: "3",
    src: "https://images.pexels.com/photos/6474300/pexels-photo-6474300.jpeg",
    alt: "Expert wall painting and interior renovation",
    category: "painting",
  },
  {
    id: "4",
    src: "https://images.pexels.com/photos/5217124/pexels-photo-5217124.jpeg",
    alt: "Furniture assembly and installation work",
    category: "assembly",
  },
  {
    id: "5",
    src: "https://images.pexels.com/photos/6474133/pexels-photo-6474133.jpeg",
    alt: "Professional interior wall painting service",
    category: "painting",
  },
  {
    id: "6",
    src: "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg",
    alt: "Professional home cleaning and maintenance",
    category: "cleaning",
  },
  {
    id: "7",
    src: "https://images.pexels.com/photos/5691534/pexels-photo-5691534.jpeg",
    alt: "Precision carpentry and window frame work",
    category: "carpentry",
  },
  {
    id: "8",
    src: "https://images.pexels.com/photos/11229483/pexels-photo-11229483.jpeg",
    alt: "Seasonal maintenance and snow removal",
    category: "maintenance",
  },
]

const categories = [
  { id: "all", label: "All Projects" },
  { id: "carpentry", label: "Carpentry" },
  { id: "painting", label: "Painting" },
  { id: "fixtures", label: "Fixtures" },
  { id: "assembly", label: "Assembly" },
  { id: "cleaning", label: "Cleaning" },
  { id: "maintenance", label: "Maintenance" },
]

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)

  const filteredImages =
    selectedCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  return (
    <section id="gallery" className="py-16 md:py-24 bg-primary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-balance">Our Work Gallery</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Explore our completed projects showcasing quality craftsmanship and attention to detail
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-background border border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              layoutId={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelectedImage(image)}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-64 md:h-72 overflow-hidden bg-muted">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white text-sm font-semibold transition-opacity duration-300">
                    View Full Image
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredImages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-foreground/70 text-lg">No projects found in this category</p>
          </motion.div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full h-auto max-h-screen"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto rounded-lg object-cover max-h-screen"
            />
            <p className="text-white text-center mt-4">{selectedImage.alt}</p>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
