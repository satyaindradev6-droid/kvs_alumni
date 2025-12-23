import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-8 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Section - Logo and Description */}
        <div className="flex-1 max-w-md space-y-3">
          <div className="flex items-center gap-3">
            <Image 
              src="/images/logo.png" 
              alt="KVS Logo" 
              width={60} 
              height={60}
              className="object-contain"
            />
            
            <div>
              <h3 className="text-sm font-semibold text-orange-400">Bhakti Returns district</h3>
              <h2 className="text-base font-bold">Kendriya Vidyalaya Sangathan</h2>
              <p className="text-xs text-gray-400">An Autonomous Body Under Ministry of Education, Govt. of India</p>
            </div>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Kendriya Vidyalaya Sangathan (KVS) offers quality education to the children of transferable central government employees, including those in the Defence and Paramilitary services by providing a common programme of education.
          </p>
        </div>

        {/* Middle Section - Useful Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold mb-1">Useful Links</h3>
          <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
            Home
          </a>
          <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
            Member
          </a>
          <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
            Events
          </a>
          <a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">
            Alumni in News
          </a>
        </div>

        {/* Right Section - Contact Information */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-sm font-semibold mb-1">Contact Information</h3>
          <p className="text-xs text-gray-300">18, Institutional Area Shaheed Jeet</p>
          <p className="text-xs text-gray-300">Singh Marg, New Delhi - 110 016(India)</p>
          <div className="flex items-center gap-2 mt-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-xs text-gray-300">+91-11-26858570</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span className="text-xs text-gray-300">www.kvsangathan.nic.in</span>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-3 mt-3">
            <a
              href="#"
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              href="#"
              className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            <a
              href="#"
              className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            <a
              href="#"
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 
