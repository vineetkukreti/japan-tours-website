"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";

const timelineData = [
  {
    days: "Days 1–3",
    city: "Osaka",
    images: [
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=300&h=400&fit=crop",
    ],
  },
  {
    days: "Days 4–6",
    city: "Kyoto",
    images: [
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=300&h=400&fit=crop",
    ],
  },
  {
    days: "Days 7–10",
    city: "Tokyo",
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=400&fit=crop",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300&h=400&fit=crop",
    ],
  },
];

function TimelineItem({
  data,
  index,
}: {
  data: (typeof timelineData)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : undefined}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        delay: shouldReduceMotion ? 0 : index * 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative flex items-start gap-8"
    >
      {/* Node */}
      <div className="relative flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-lime-accent z-10" />
        {index < timelineData.length - 1 && (
          <div className="w-px h-32 bg-white/20 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-16">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          <div>
            <p className="text-xs tracking-widest-plus uppercase text-mouse-gray font-body mb-1">
              {data.days}
            </p>
            <h3 className="text-2xl font-display text-kimono-white mb-4">
              {data.city}
            </h3>
          </div>

          {/* Photo Cluster */}
          <motion.div
            className="relative flex gap-2 group"
            whileHover="hover"
          >
            {data.images.map((img, i) => (
              <motion.div
                key={i}
                className="relative w-[140px] h-[180px] border-4 border-kimono-white shadow-lg overflow-hidden"
                style={{
                  transform: `rotate(${i === 0 ? -3 : 3}deg)`,
                }}
                variants={{
                  hover: {
                    rotate: i === 0 ? -6 : 6,
                    x: i === 0 ? -8 : 8,
                    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
              >
                <Image
                  src={img}
                  alt={`${data.city} ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-8 md:px-16 bg-mist-black"
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-8 mb-24"
      >
        <div className="flex-1 hairline" />
        <h2 className="text-5xl md:text-7xl font-display text-kimono-white tracking-tight">
          ABOUT THE TOUR
        </h2>
        <div className="flex-1 hairline" />
      </motion.div>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column - Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <p className="text-lg md:text-xl font-serif text-kimono-white/80 leading-relaxed">
            We&apos;ve planned a simple and convenient 10-day itinerary for your
            trip to Japan. You&apos;ll visit three cities:{" "}
            <span className="text-lime-accent">Osaka, Kyoto, and Tokyo</span>.
          </p>

          <p className="text-lg md:text-xl font-serif text-kimono-white/80 leading-relaxed">
            No need to worry about routes, schedules, or finding places —
            everything is already organized. We&apos;ll show you where to go, what
            to see, and where to eat, so you can simply{" "}
            <span className="text-lime-accent">enjoy the journey</span>.
          </p>
        </motion.div>

        {/* Right Column - Timeline */}
        <div className="relative">
          {timelineData.map((item, i) => (
            <TimelineItem key={item.city} data={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
