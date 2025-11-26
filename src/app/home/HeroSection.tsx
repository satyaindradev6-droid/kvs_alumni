import Image from "next/image"

export function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative w-full h-[600px]">
        <Image
          src="/images/Mask group.png"
          alt="Kendriya Vidyalaya Sangathan Headquarters Building"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </section>
  )
}
