import heroImage from "@/assets/hero-roof.jpg";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-24 md:pt-28">
      {/* Video background */}
      <video
        src={VIDEO_URL}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Subtle dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/25" />

      <div className="container-wide relative z-10">
        <div className="grid md:grid-cols-12 gap-8 pb-10 md:pb-14">
          <div className="md:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] text-white text-balance drop-shadow-lg"
            >
              Střecha, která chrání<br />
              <span className="italic text-copper">váš domov</span> i po generace.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button asChild variant="ink" size="xl" className="mt-10">
                <a href="#kontakt">Nezávazná poptávka</a>
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="md:col-span-4 md:pt-3 flex md:justify-end"
          >
            <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-xs">
              Specialista na přírodní břidlici a kompletní realizace střech v okrese Šumperk. Řemeslo s respektem k tradici i k detailu.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl aspect-[16/9] md:aspect-[21/9] bg-cream-deep shadow-elegant"
        >
          <motion.img
            src={heroImage}
            alt="Rodinný dům s přírodní břidlicovou střechou v okrese Šumperk"
            style={{ y, scale, opacity }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="absolute top-6 left-6 md:top-8 md:left-8 bg-cream/90 backdrop-blur-sm px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.25em] text-ink"
          >
            Leština · Okres Šumperk
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="absolute bottom-6 right-6 md:bottom-8 md:right-8"
          >
            <Button asChild variant="outlineLight" size="lg">
              <a href="#sluzby">Naše služby →</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
