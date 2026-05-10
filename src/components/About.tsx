import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-roof.jpg";
import Reveal from "@/components/Reveal";
import { motion } from "framer-motion";

const stats = [
  { v: "20+", l: "Let praxe" },
  { v: "300+", l: "Realizovaných střech" },
  { v: "100%", l: "Přírodní materiály" },
  { v: "5,0★", l: "Hodnocení" },
];

const About = () => {
  return (
    <section id="o-nas" className="py-24 md:py-32">
      <div className="container-wide grid md:grid-cols-12 gap-10 md:gap-16 items-start">
        <div className="md:col-span-5 md:sticky md:top-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-deep shadow-card"
          >
            <img src={heroImage} alt="Realizace střechy v okrese Šumperk" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
          <Reveal delay={0.2} className="mt-6 bg-card rounded-2xl shadow-card p-6 -mt-20 ml-6 relative z-10">
            <div className="font-display text-2xl text-ink">Přemysl Nečas</div>
            <div className="text-xs uppercase tracking-[0.25em] text-copper mt-1">Majitel · Mistr pokrývač</div>
            <div className="mt-4 pt-4 border-t border-border text-sm text-ink-soft">
              Leština, okres Šumperk · 20+ let praxe
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <span className="eyebrow">O nás</span>
            <h2 className="font-display text-4xl md:text-6xl text-ink mt-4 leading-[1.05] text-balance">
              Tradice, řemeslo <span className="italic text-copper">a poctivost.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-ink-soft mt-8 leading-relaxed text-lg">
              Firma <strong className="text-ink font-medium">Střechy & Izolace Přemysl Nečas</strong> působí v okrese Šumperk již přes 20 let. Specializujeme se na pokrývačské, klempířské a tesařské práce s důrazem na kvalitu materiálů a precizní řemeslné provedení.
            </p>
            <p className="text-ink-soft mt-4 leading-relaxed">
              Naší doménou je přírodní břidlice — materiál, který přečká generace a zdobí ty nejkrásnější domy v regionu. Pracujeme s výjimečnou pečlivostí na detailu, ať jde o volská oka, měděné klempířské prvky nebo tesařské krovy.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-px bg-border mt-12 rounded-2xl overflow-hidden">
            {stats.map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-background p-6"
              >
                <div className="font-display text-4xl text-ink">{s.v}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.l}</div>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.2}>
            <Button asChild variant="ink" size="xl" className="mt-10">
              <a href="#kontakt">Nezávazná poptávka</a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
