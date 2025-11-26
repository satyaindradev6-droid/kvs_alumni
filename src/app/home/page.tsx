import React from "react"
import { HeroSection } from "./HeroSection"
import AlumniSection from "./animationSection"
import { StatsSection } from "./statsSection"
import { EventsSection } from "./upcomingEvents"
import { ContactSection } from "./contactSection"
import AlumniImages from "./alumni"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <AlumniSection/>
      <StatsSection />
      <EventsSection />
      {/* <ContactSection /> */}
      {/* <AlumniImages /> */}
    </div>
  )
}
