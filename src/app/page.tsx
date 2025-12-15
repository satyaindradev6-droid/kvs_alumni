"use client"

import { HeroSection } from "./landingpage/HeroSection"
import HomePage from "./landingpage/page"
import MainLayout from "./MainLayout"

export default function Home() {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  )
}
