"use client"

import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppPage = pathname === "/chat" || pathname === "/home" || pathname === "/profile";

  if (isAppPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
