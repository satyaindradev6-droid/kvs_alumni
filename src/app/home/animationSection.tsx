"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AlumniSection() {
  return (
    <section className="relative py-16 px-8 lg:px-16 overflow-hidden bg-[#f5f5f5]">
      {/* Decorative Icons */}
      <div className="absolute left-8 top-16 w-[55px] h-[55px] animate-bounce">
        <Image src="/images/Group 10.svg" alt="Decorative icon" width={55} height={55} className="object-contain" />
      </div>

      <div className="absolute right-8 top-[140px] w-[55px] h-[55px] animate-bounce" style={{ animationDelay: '0.6s' }}>
        <Image src="/images/Group 12.svg" alt="Decorative icon" width={55} height={55} className="object-contain" />
      </div>

      <div className="absolute left-8 bottom-24 w-[55px] h-[55px] animate-bounce" style={{ animationDelay: '0.2s' }}>
        <Image src="/images/Group 9.svg" alt="Decorative icon" width={55} height={55} className="object-contain" />
      </div>


      <div className="absolute bottom-[150px] right-[35%] w-[45px] h-[45px] animate-bounce" style={{ animationDelay: '1s' }}>
        <Image src="/images/Group 13.svg" alt="Decorative icon" width={45} height={45} className="object-contain" />
      </div>
      <div className="absolute bottom-20 left-[45%] w-[55px] h-[55px] animate-slide-lr" style={{ animationDelay: '0.4s' }}>
        <Image src="/images/Group 11.svg" alt="Decorative icon" width={55} height={55} className="object-contain" />
      </div>

      <div className="absolute right-8 bottom-12 w-[65px] h-[65px] animate-pulse">
        <Image src="/images/pen.svg" alt="Decorative icon" width={65} height={65} className="object-contain" />
      </div>



      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <p className="text-[#1E3A5F] font-semibold tracking-wide text-sm uppercase">Kendriya Vidyalaya Sangathan</p>

          <div className="relative">
            <h1 className="text-4xl lg:text-5xl font-serif italic text-[#1E3A5F] leading-tight">
              We Welcome You To{" "}
              <br />
              Learn More About Us{" "}
            </h1>
            <div className="absolute -right-12 top-0 w-[60px] h-[60px] animate-slide-lr">
              <Image src="/images/Group 8.svg" alt="Decorative icon" width={60} height={60} className="object-contain" />
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed max-w-lg">
            This Alumni platform of Kendriya Vidyalaya Sangathan serves as a means to reconnect with classmates,
            teachers, and the school community. This platform facilitates communication, share updates about alumni
            achievements, and organize reunions or events. Alumn associations play a crucial role in fostering a sense
            of community and providing support for current students.
          </p>

          <Button className="bg-[#1E3A5F] hover:bg-[#2d4a6f] text-white px-8 py-6 rounded-md text-base">
            Know More
          </Button>
        </div>

        {/* Right Content - Photo Collage */}
        <div className="relative h-[500px] lg:h-[550px]">
          {/* Top Right Image */}
          <div className="absolute top-0 right-0 w-[300px] h-[200px] rotate-[8deg] shadow-2xl rounded-2xl overflow-hidden z-10 border-8 border-white">
            <Image src="/images/1.png" alt="Alumni group with teachers" fill className="object-cover" />
          </div>

          {/* Middle Center-Left Image - Larger */}
          <div className="absolute top-[120px] left-[50px] w-[320px] h-[200px] -rotate-[5deg] shadow-2xl rounded-2xl overflow-hidden z-20 border-8 border-white">
            <Image src="/images/2.png" alt="Large alumni gathering" fill className="object-cover" />
          </div>

          {/* Bottom Right Image - Overlapping */}
          <div className="absolute bottom-[40px] right-[20px] w-[280px] h-[200px] rotate-[6deg] shadow-2xl rounded-2xl overflow-hidden z-30 border-8 border-white">
            <Image src="/images/3.png" alt="Alumni meeting" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  )
}
