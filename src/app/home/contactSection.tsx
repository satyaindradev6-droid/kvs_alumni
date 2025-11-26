import { Phone } from "lucide-react"

export function ContactSection() {
  return (
    <div className="flex justify-center items-center px-4 py-12">
      <div className="max-w-7xl w-full bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Left Info Section with background image */}
        <div className="relative w-full lg:w-[420px] min-h-[350px] lg:min-h-[480px] rounded-2xl overflow-hidden">
          {/* Background Image */}
          <img
            src="/images/building.png"
            alt="Kendriya Vidyalaya Building"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient Overlay - cyan tint with stronger opacity at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/60 via-cyan-500/70 to-cyan-500/90" />

          {/* Text Content - positioned at bottom */}
          <div className="relative h-full p-8 flex flex-col justify-end">
            <h2 className="text-2xl font-semibold italic mb-2 text-white">Kendriya Vidyalaya Sangathan</h2>
            <p className="text-sm text-white/90 mb-6 max-w-[300px]">
              Connect with us for queries, feedback, or collaboration opportunities.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full border-2 border-white/80 flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-medium text-white">+91 11 26858570</span>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="flex-1 p-8 lg:p-10 bg-white">
          <p className="text-xs font-semibold tracking-wider text-gray-800 mb-1">LETS CONNECT</p>
          <h1 className="text-4xl font-semibold text-cyan-500 mb-8">Contact Us</h1>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-3.5 bg-cyan-50/70 border-0 rounded-md text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full px-4 py-3.5 bg-cyan-50/70 border-0 rounded-md text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3.5 bg-cyan-50/70 border-0 rounded-md text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="text"
                placeholder="Purpose"
                className="w-full px-4 py-3.5 bg-cyan-50/70 border-0 rounded-md text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-3.5 bg-cyan-50/70 border-0 rounded-md text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-none"
            />
          </form>
        </div>
      </div>
      </div>
    </div>
  )
}
