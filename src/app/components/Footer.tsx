import { Facebook, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer>
      {/* Main Footer Section */}
      <div className="bg-[#2d3e50] text-white py-10 px-8 lg:px-16 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kendriya Vidyalaya Sangathan</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Kendriya Vidyalaya Sangathan(KVS) offers quality education to the children of transferable central
              government employees, including those in the Defence and Paramilitary services by providing a common
              programme of education.
            </p>
          </div>

          {/* Middle Section - Social Media */}
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">Our Social Media</h3>
            <div className="flex items-center gap-4">
              {/* X (Twitter) Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#1877f2] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Facebook className="w-5 h-5 text-white" fill="white" />
              </a>

              {/* YouTube Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#ff0000] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Youtube className="w-5 h-5 text-white" />
              </a>

              {/* Instagram Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Right Section - Useful Links */}
          <div className="flex flex-col items-center md:items-end space-y-3">
            <h3 className="text-lg font-semibold">Useful Links</h3>
            <nav className="flex flex-col items-center md:items-end space-y-2">
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Home
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Member
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Events
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-white transition-colors">
                Alumni in News
              </a>
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#4a3f6b] text-center py-3 px-4">
        <p className="text-sm text-gray-300">
          The Portal Designed, Developed & Maintained by IT Cell, Kendriya Vidyalaya Sangathan, HQs, New Delhi
        </p>
      </div>
    </footer>
  )
} 
