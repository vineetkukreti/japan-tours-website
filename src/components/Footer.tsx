"use client";

import { Globe, Camera, MessageCircle, Send } from "lucide-react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Included", href: "#included" },
  { label: "Contacts", href: "#contact" },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-mist-black py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="text-xs tracking-widest-plus uppercase text-kimono-white/60 hover:text-kimono-white transition-colors duration-300 font-body"
              data-cursor-hover
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Hairline */}
        <div className="hairline mb-8" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2"
            data-cursor-hover
          >
            <Globe className="w-5 h-5 text-kimono-white/60 stroke-[1.5]" />
            <span className="text-xs tracking-widest-plus uppercase font-body text-kimono-white/60">
              Japan Tours
            </span>
          </button>

          {/* Social Icons */}
          <div className="flex items-center gap-6">
            {[Camera, MessageCircle, Send].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="text-kimono-white/40 hover:text-kimono-white transition-colors duration-300"
                data-cursor-hover
              >
                <Icon className="w-5 h-5 stroke-[1.5]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
