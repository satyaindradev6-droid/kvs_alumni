import Image from "next/image"

const stats = [
  {
    icon: "/images/statsSection/Vector.svg",
    value: "946513",
    label: "Total Students",
  },
  {
    icon: "/images/statsSection/Vector (1).svg",
    value: "45125",
    label: "Total Teachers",
  },
  {
    icon: "/images/statsSection/Vector (2).svg",
    value: "946513",
    label: "Total Alumni Students",
  },
  {
    icon: "/images/statsSection/Vector (3).svg",
    value: "45125",
    label: "Total Alumni Teachers",
  },
]

export function StatsSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/statsSection/group-of-students-and-teachers-in-formal-attire-at.jpg')`,
        }}
      />

      {/* Dark Blue/Purple Overlay */}
      <div className="absolute inset-0 bg-[#2a2d5e]/90" />

      {/* Content */}
      <div className="relative z-10 px-4 py-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative flex flex-col items-center justify-center text-center">
                {/* Vertical Divider (not on first item) */}
                {index > 0 && (
                  <div className="absolute left-0 top-1/2 hidden h-20 w-px -translate-y-1/2 bg-white/20 lg:block" />
                )}

                {/* Icon */}
                <div className="mb-6 flex items-center justify-center w-[56px] h-[56px]">
                  <Image src={stat.icon} alt={stat.label} width={56} height={56} className="brightness-0 invert w-full h-full object-contain" />
                </div>

                {/* Value */}
                <div className="mb-3 text-5xl font-light tracking-tight text-white md:text-6xl">{stat.value}</div>

                {/* Label */}
                <div className="text-base font-normal tracking-wide text-[#4fd1c5]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
