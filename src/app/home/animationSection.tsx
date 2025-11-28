"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AlumniSection() {
  return (
    <section className="relative py-20 px-8 lg:px-16 overflow-hidden bg-gradient-to-br from-[#e8eef5] to-[#f5f5f5]">
      {/* Decorative Icons */}
      {/* <div className="absolute left-8 top-32 w-[50px] h-[50px] animate-bounce">
        <Image src="/images/Group 10.svg" alt="Book icon" width={50} height={50} className="object-contain" />
      </div> */}

      <div className="absolute right-12 top-40 w-[70px] h-[70px] animate-bounce" style={{ animationDelay: '0.5s' }}>
        <Image src="/images/Group 12.svg" alt="Pencil holder icon" width={70} height={70} className="object-contain" />
      </div>

      <div className="absolute left-12 bottom-32 w-[70px] h-[70px] animate-bounce" style={{ animationDelay: '0.3s' }}>
        <Image src="/images/Group 9.svg" alt="Books icon" width={70} height={70} className="object-contain" />
      </div>

      <div className="absolute bottom-40 right-[38%] w-[65px] h-[65px] animate-bounce" style={{ animationDelay: '0.8s' }}>
        <Image src="/images/Group 13.svg" alt="Science icon" width={65} height={65} className="object-contain" />
      </div>

      <div className="absolute bottom-28 left-[48%] w-[70px] h-[70px] animate-bounce" style={{ animationDelay: '0.4s' }}>
        <Image src="/images/Group 11.svg" alt="Plant icon" width={70} height={70} className="object-contain" />
      </div>

      <div className="absolute right-12 bottom-20 w-[80px] h-[80px] animate-pulse">
        <Image src="/images/Pen.svg" alt="Pen icon" width={80} height={80} className="object-contain" />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-6 relative">
          <p className="text-[#4A90E2] font-semibold tracking-wide text-sm uppercase">
            Kendriya Vidyalaya Sangathan
          </p>

          <div className="relative">
            <div className="absolute -left-20 top-2 w-[70px] h-[70px]">
        <Image src="/images/Group 10.svg" alt="Book icon" width={60} height={60} className="object-contain" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#2C3E50] leading-tight">
              We Welcome You To{" "}
              <br />
              Learn More About Us{" "}
              <span className="inline-block ml-2">
                <Image src="/images/Group 8.svg" alt="Pen" width={50} height={50} className="inline-block" />
              </span>
            </h1>
          </div>

          <p className="text-gray-700 leading-relaxed max-w-lg text-[15px]">    
            This Alumni platform of Kendriya Vidyalaya Sangathan serves as a means to reconnect 
            with classmates, teachers, and the school community. This platform facilitates 
            communication, share updates about alumni achievements, and organize reunions or 
            events. Alumni associations play a crucial role in fostering a sense of community and 
            providing support for current students.
          </p>

          <Button className="bg-[#2C3E50] hover:bg-[#34495e] text-white px-8 py-3 rounded-md text-base font-medium shadow-lg">
            Know More
          </Button>
        </div>

        {/* Right Content - Photo Collage */}
        <div className="relative h-[550px] lg:h-[600px]">
          {/* Top Right Image */}
          <div className="absolute top-0 right-0 w-[400px] h-[240px] rotate-[8deg] shadow-2xl rounded-2xl overflow-hidden z-10 border-[10px] border-white">
            <Image src="/images/1.png" alt="Alumni group" fill className="object-cover" />
          </div>

          {/* Middle Center-Left Image - Larger */}
          <div className="absolute top-[120px] left-[20px] w-[420px] h-[260px] -rotate-[6deg] shadow-2xl rounded-2xl overflow-hidden z-20 border-[10px] border-white">
            <Image src="/images/2.png" alt="Large alumni gathering" fill className="object-cover" />
          </div>

          {/* Bottom Right Image - Overlapping */}
          <div className="absolute bottom-[20px] right-[10px] w-[380px] h-[240px] rotate-[7deg] shadow-2xl rounded-2xl overflow-hidden z-30 border-[10px] border-white">
            <Image src="/images/3.png" alt="Alumni meeting" fill className="object-cover" />
          </div>

        
        </div>
      </div>
    </section>
  )
}
