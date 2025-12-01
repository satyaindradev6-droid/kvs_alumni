"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const alumniImages = [
  "/images/alumni/Mask group (2).png",
  "/images/alumni/Mask group (3).png",
    "/images/alumni/Mask group (4).png",
]

const alumni = [
  {
    name: "Kanhiya Dixit",
    role: "Student",
    image: alumniImages[0],
  },
  {
    name: "Harihar Dubey",
    role: "Student",
    image: alumniImages[1],
  },
  {
    name: "Madvi Jhoshi",
    role: "Student",
    image: alumniImages[2],
  },
  {
    name: "Satya Indra Dev",
    role: "Student",
    image: alumniImages[1],
  },
  {
    name: "Ashutosh Chouhan",
    role: "Student",
    image: alumniImages[0],
  },
  {
    name: "Priya Sharma",
    role: "Student",
    image: alumniImages[1],
  },
  {
    name: "Rahul Verma",
    role: "Student",
    image: alumniImages[0],
  },
]

export default function AlumniImages() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsToShow = 5

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsToShow >= alumni.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, alumni.length - itemsToShow) : prev - 1))
  }

  const visibleAlumni = alumni.slice(currentIndex, currentIndex + itemsToShow)

  return (
    <section className="py-16 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-semibold tracking-wide uppercase mb-2" style={{ color: 'var(--theme-primary)' }}>OUR ALUMNIS</p>
          <h2 className="text-4xl font-bold mb-3" style={{ color: 'var(--theme-primary)' }}>Members</h2>
          <p className="text-gray-500 text-sm max-w-3xl">
            Alumni are great role models for current students and are often well placed to offer practical support to
            students as they start their careers.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute -left-12 z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-colors shadow-sm"
            style={{ 
              '--hover-border': 'var(--theme-primary)',
              '--hover-text': 'var(--theme-primary)'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--theme-primary)'
              e.currentTarget.style.color = 'var(--theme-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.color = ''
            }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>

          {/* Alumni Cards */}
          <div className="flex gap-6 justify-center w-full overflow-hidden">
            {visibleAlumni.map((member, index) => (
              <div key={`${member.name}-${index}`} className="flex flex-col items-center text-center min-w-[200px]">
                <div className="w-[200px] h-[260px] overflow-hidden rounded-lg mb-4">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-medium text-gray-800 text-base">{member.name}</h3>
                <p className="text-sm" style={{ color: 'var(--theme-primary)' }}>{member.role}</p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute -right-12 z-10 w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center transition-colors shadow-sm"
            style={{ 
              '--hover-border': 'var(--theme-primary)',
              '--hover-text': 'var(--theme-primary)'
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--theme-primary)'
              e.currentTarget.style.color = 'var(--theme-primary)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.color = ''
            }}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </section>
  )
}
