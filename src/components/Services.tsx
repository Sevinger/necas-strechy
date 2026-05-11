import slate from "@/assets/service-slate.jpg";
import roofing from "@/assets/service-roofing.jpg";
import tinsmith from "@/assets/service-tinsmith.jpg";
import insulation from "@/assets/service-insulation.jpg";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const services = [
  { title: "Přírodní břidlice", subtitle: "Specialita firmy", image: slate, meta: ["Volská oka", "Šablonové krytí", "Restaurace"], badge: "Mistrovské řemeslo" },
  { title: "Pokrývačské práce", subtitle: "Všechny krytiny", image: roofing, meta: ["Tondach", "Bramac", "Lindab"], badge: "Kompletní realizace" },
  { title: "Klempířství & Krovy", subtitle: "Měď · Titanzinek · Dřevo", image: tinsmith, meta: ["Okapy", "Krovy", "Oplechování"], badge: "Tesařské konstrukce" },
  { title: "Izolace & Okna", subtitle: "Ploché střechy a okna", image: insulation, meta: ["Hydroizolace", "VELUX", "Zateplení"], badge: "Moderní řešení" },
];

const Services = () => {
  return (
    <section id="sluzby" className="py-24 md:py-32 bg-cream-deep/80 backdrop-blur-sm">
      <div className="container-wide">
        <Reveal className="grid md:grid-cols-12 gap-8 mb-14">
          <h2 className="md:col-span-8 font-display text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.05] text-balance">
            Provázíme vás cestou k <span className="italic text-copper">dokonalé střeše</span>
          </h2>
          <p className="md:col-span-4 md:pt-2 text-ink-soft leading-relaxed max-w-sm">
            Naše vize spojuje řemeslnou tradici, kvalitu materiálů a poctivý přístup tak, aby každá střecha přesahovala očekávání.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elegant transition-shadow duration-500"
            >
              <div className="relative aspect-video md:aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-110"
                />
                <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-cream/90 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-ink">
                  {s.badge}
                </div>
              </div>
              <div className="p-3 md:p-6">
                <h3 className="font-display text-base md:text-2xl text-ink leading-tight mb-1 md:mb-2">{s.title}</h3>
                <p className="text-[10px] md:text-xs uppercase tracking-[0.15em] text-copper mb-2 md:mb-4">{s.subtitle}</p>
                <div className="hidden md:flex flex-wrap gap-x-4 gap-y-1.5 pt-4 border-t border-border text-xs text-muted-foreground">
                  {s.meta.map((m, idx) => (
                    <span key={m} className="flex items-center gap-2">
                      {idx > 0 && <span className="w-px h-3 bg-border -ml-2" />}
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
