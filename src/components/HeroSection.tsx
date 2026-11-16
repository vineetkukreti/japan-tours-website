"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Camera, MessageCircle, Send } from "lucide-react";
import Image from "next/image";

const polaroidData = [
  {
    caption: "3 cities in Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
  },
  {
    caption: "10 days",
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=300&fit=crop",
  },
  {
    caption: "gigabytes of photos",
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&h=300&fit=crop",
  },
  {
    caption: "eat ramen",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
  },
  {
    caption: "enjoy the vibe",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
  },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const mountainY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 180],
  );
  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, 300],
  );
  const cardsX = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -240],
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-mist-black"
    >
      {/* Background Plane - sky and distant landscape */}
      <motion.div
        className="absolute inset-0 z-0 will-change-transform"
        style={{ y: mountainY, willChange: "transform" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1920&h=1080&fit=crop"
          alt="Misty Japanese mountains at dawn"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-mountain-cream/15 via-transparent to-mist-black" />
      </motion.div>

      {/* Mid-ground Plane - Typography */}
      <motion.div
        className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ y: textY, willChange: "transform" }}
      >
        <h1 className="font-display text-[22vw] leading-none text-stroke text-kimono-white/80 tracking-normal select-none -translate-y-[10vh]">
          JAPAN
        </h1>
      </motion.div>

      {/* Foreground mountain mask keeps the typography tucked behind the peaks */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none will-change-transform"
        style={{
          y: mountainY,
          willChange: "transform",
          clipPath:
            "polygon(0 44%, 18% 38%, 36% 43%, 54% 35%, 72% 41%, 100% 32%, 100% 100%, 0 100%)",
        }}
      >
        <Image
          src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1920&h=1080&fit=crop"
          alt=""
          fill
          className="object-cover object-top"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mist-black/10 to-mist-black" />
      </motion.div>

      {/* Foreground Plane - Kimono Figure */}
      <div className="absolute bottom-0 right-[10%] z-30 w-[300px] h-[500px] md:w-[400px] md:h-[600px]">
        <Image
          src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=500&h=700&fit=crop"
          alt="Woman in kimono"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Social Icons - Right Edge */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-6"
      >
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
      </motion.div>

      {/* Polaroid Cards Strip */}
      <motion.div
        className="absolute bottom-12 left-8 z-40 flex gap-4 will-change-transform"
        style={{ x: cardsX, willChange: "transform" }}
      >
        {polaroidData.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.8 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
              boxShadow: "0 20px 40px rgba(255, 184, 197, 0.2)",
              transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
            }}
            className="group relative bg-kimono-white p-2 pb-8 shadow-xl cursor-pointer"
            data-cursor-hover
          >
            <div className="relative w-[140px] h-[100px] md:w-[160px] md:h-[120px] overflow-hidden">
              <Image
                src={card.image}
                alt={card.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-lime-accent/0 group-hover:bg-lime-accent/10 transition-colors duration-300" />
            </div>
            <p className="absolute bottom-2 left-2 text-[10px] text-mist-black/60 font-body">
              {card.caption}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Book Button - Right of Kimono */}
      <motion.button
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        whileHover={{ scale: 1.05 }}
        className="absolute bottom-24 right-[15%] z-40 px-8 py-4 bg-mountain-cream/90 backdrop-blur-md rounded-full text-mist-black font-body text-sm tracking-wider uppercase hover:bg-lime-accent transition-colors duration-300"
        data-cursor-hover
      >
        Book
      </motion.button>
    </section>
  );
}
