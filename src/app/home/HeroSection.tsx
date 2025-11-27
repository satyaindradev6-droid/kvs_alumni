"use client"

import Image from "next/image"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    { src: "/images/crousal1/IMG-20251125-WA0019 1.png", alt: "KVS Students 1" },
    { src: "/images/crousal1/IMG-20251125-WA0023 1.png", alt: "KVS Students 2" },
    { src: "/images/crousal1/IMG-20251125-WA0025 1.png", alt: "KVS Students 3" },
    { src: "/images/crousal1/IMG-20251125-WA0029 1.png", alt: "KVS Students 4" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative w-full">
      {/* Entire Hero Wrapper */}
      <div className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] xl:h-[600px] overflow-hidden">

        {/* Background Gradient (covers left side similar to image) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#18245d] via-[#223176] to-transparent z-10" />

        {/* Carousel Images */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              className={`object-none object-right transition-transform duration-[5000ms] ease-out ${
                index === currentSlide ? "scale-100" : "scale-125"
              }`}
              priority={index === 0}
            />

            {/* Extra dark fade on far-left so text stays readable */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#111b4d]/90 to-transparent" />
          </div>
        ))}

        {/* Text Content */}
        <div className="absolute inset-y-0 left-0 flex items-center z-20 px-6 md:px-12">
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">
            KVS Alumni<br />
            Management Portal
          </h1>
        </div>

        {/* Bottom Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-110" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
