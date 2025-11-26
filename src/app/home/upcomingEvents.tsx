"use client"

import { useState, useEffect } from "react"
import { Calendar, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"

const events = [
  {
    id: 1,
    image: "/images/eventSection/Rectangle 15.png",
    date: "26 Nov, 2025",
    description:
      "Alumni participation in school events can greatly enrich the educational experience for current students...",
  },
  {
    id: 2,
    image: "/images/eventSection/Rectangle 16.png",
    date: "26 Nov, 2025",
    description:
      "Alumni participation in school events can greatly enrich the educational experience for current student...",
  },
  {
    id: 3,
    image: "/images/eventSection/Rectangle 17.png",
    date: "26 Nov, 2025",
    description:
      "Alumni participation in school events can greatly enrich the educational experience for current student....",
  },
  {
    id: 4,
    image: "/images/eventSection/Rectangle 18.png",
    date: "26 Nov, 2025",
    description:
      "Alumni participation in school events can greatly enrich the educational experience for current students...",
  },
  {
    id: 5,
    image: "/images/eventSection/Rectangle 15.png",
    date: "26 Nov, 2025",
    description:
      "Alumni participation in school events can greatly enrich the educational experience for current students...",
  },
]

export function EventsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 4

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % events.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % events.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getVisibleEvents = () => {
    const visible = []
    for (let i = 0; i < itemsPerPage; i++) {
      visible.push(events[(currentIndex + i) % events.length])
    }
    return visible
  }

  return (
    <section className="relative py-16 px-8 overflow-hidden bg-[#f8f9fb]">
      {/* Animated Triangles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Triangle 1 - Back */}
        <div className="absolute -top-20 left-[15%] animate-float-slow">
          <svg width="400" height="400" viewBox="0 0 400 400">
            <polygon points="200,50 350,350 50,350" fill="none" stroke="#d1d5db" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        
        {/* Triangle 2 - Front */}
        <div className="absolute -top-10 left-[20%] animate-float-medium">
          <svg width="350" height="350" viewBox="0 0 350 350">
            <polygon points="175,50 300,300 50,300" fill="none" stroke="#d1d5db" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <p className="text-[#0891b2] font-semibold text-sm tracking-wide mb-2">OUR EVENTS</p>
            <h2 className="text-[#1e3a5f] text-4xl font-bold leading-tight">
              Upcoming/Recent
              <br />
              Events
            </h2>
          </div>
          <button className="bg-[#1e3a5f] text-white px-5 py-2.5 rounded flex items-center gap-1 text-sm font-medium hover:bg-[#162d4d] transition-colors">
            View All
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full border-2 border-[#0891b2] bg-white flex items-center justify-center text-[#0891b2] hover:bg-[#0891b2] hover:text-white transition-colors shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="overflow-hidden px-8">
            <div 
              className="flex gap-6 transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {[...events, ...events].map((event, index) => (
                <div 
                  key={`${event.id}-${index}`} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm flex-shrink-0"
                  style={{ width: `calc((100% - ${(itemsPerPage - 1) * 24}px) / ${itemsPerPage})` }}
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={event.image || "/placeholder.svg"} alt="Event" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[#0891b2] mb-3">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">{event.date}</span>
                    </div>
                    <p className="text-[#4b5563] text-sm leading-relaxed mb-3">{event.description}</p>
                    <a
                      href="#"
                      className="text-[#0891b2] text-sm font-medium inline-flex items-center gap-1 hover:underline"
                    >
                      Read More
                      <ChevronsRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white hover:bg-[#162d4d] transition-colors shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
