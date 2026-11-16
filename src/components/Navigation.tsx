"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Globe } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Included", href: "#included" },
  { label: "Contacts", href: "#contact" },
];

export default function Navigation() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between"
    >
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="flex items-center gap-2 group"
        data-cursor-hover
      >
        <Globe className="w-5 h-5 text-kimono-white stroke-[1.5]" />
        <span className="text-xs tracking-widest-plus uppercase font-body text-kimono-white">
          Japan Tours
        </span>
      </button>

      {/* Center Nav */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.href)}
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem(null)}
            className="relative text-xs tracking-widest-plus uppercase font-body text-kimono-white/80 hover:text-kimono-white transition-colors duration-300 py-2"
            data-cursor-hover
          >
            {item.label}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-kimono-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: hoveredItem === item.label ? 1 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
            />
          </button>
        ))}
      </div>

      {/* Book Button */}
      <button
        onClick={() => scrollToSection("#contact")}
        className="px-5 py-2 border border-kimono-white/40 rounded-full text-xs tracking-widest-plus uppercase font-body text-kimono-white hover:border-kimono-white hover:bg-kimono-white/5 transition-all duration-300"
        data-cursor-hover
      >
        Book
      </button>
    </motion.nav>
  );
}
