"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Plane, Bus, Hotel } from "lucide-react";

const includedItems = [
  {
    icon: Users,
    title: "Guides",
    description: "2 awesome guides who know everything about Japan!",
  },
  {
    icon: Plane,
    title: "Flights",
    description: "Routes: Moscow — Osaka, Tokyo — Moscow",
  },
  {
    icon: Bus,
    title: "Transfers",
    description: "From the airport to the hotels",
  },
  {
    icon: Hotel,
    title: "Hotels",
    description:
      "Comfortable accommodation, 2 people per room (breakfasts included)",
  },
];

function GlassCard({
  item,
  index,
}: {
  item: (typeof includedItems)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
      }}
      className="group glass-panel rounded-2xl p-8 hover:border-lime-accent/50 transition-colors duration-300"
      data-cursor-hover
    >
      <div className="flex flex-col h-full">
        <motion.div
          className="mb-6"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 text-lime-accent stroke-[1.5]" />
        </motion.div>

        <h3 className="text-xs tracking-widest-plus uppercase text-kimono-white font-body mb-4">
          {item.title}
        </h3>

        <p className="text-sm text-kimono-white/60 font-body leading-relaxed">
          {item.description}
        </p>
      </div>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-2xl bg-lime-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}

export default function IncludedSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="included"
      ref={sectionRef}
      className="relative py-32 px-8 md:px-16 bg-mist-black"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-8 mb-16"
      >
        <h2 className="text-5xl md:text-7xl font-display text-kimono-white tracking-tight">
          WHAT&apos;S INCLUDED
        </h2>
        <div className="flex-1 hairline" />
      </motion.div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {includedItems.map((item, i) => (
          <GlassCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
