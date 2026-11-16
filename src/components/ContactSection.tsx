"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comment: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen py-32 px-8 md:px-16 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1522383225653-ed111181a951?w=1920&h=1080&fit=crop"
          alt="Cherry blossoms and Mount Fuji"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-mist-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md"
        >
          <div className="glass-panel-heavy rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-serif text-kimono-white mb-2">
              Want to join us, but still have questions?
            </h2>

            <p className="text-xs tracking-widest-plus uppercase text-kimono-white/60 font-body mb-8">
              Leave a request
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "name", label: "Your name", type: "text" },
                { name: "phone", label: "Phone number", type: "tel" },
                { name: "comment", label: "Comment", type: "textarea" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="block text-xs tracking-widest-plus uppercase text-kimono-white/40 font-body mb-2">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      rows={3}
                      className="w-full bg-transparent border-b border-kimono-white/20 py-2 text-kimono-white font-body resize-none focus:outline-none transition-colors duration-300"
                    />
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent border-b border-kimono-white/20 py-2 text-kimono-white font-body focus:outline-none transition-colors duration-300"
                    />
                  )}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-lime-accent"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: focusedField === field.name ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    style={{ originX: 0 }}
                  />
                </div>
              ))}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-mountain-cream text-mist-black rounded-full font-body text-sm tracking-wider uppercase hover:bg-lime-accent transition-colors duration-300 mt-8"
                data-cursor-hover
              >
                Send
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
