import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const reviews = [
  { name: "Milan Pelcl", location: "Šumperk", text: "Skvělá práce, naprostá profesionalita. Pan Nečas pokryl naši starou chalupu břidlicí — výsledek předčil očekávání. Volská oka jsou mistrovská práce." },
  { name: "Tomáš Zsemlye", location: "Zábřeh", text: "Doporučuji všemi deseti. Kompletní rekonstrukce střechy proběhla rychle, čistě a za rozumnou cenu. Komunikace byla vždy na úrovni." },
  { name: "Michaela Vlčková", location: "Leština", text: "Pan Přemysl je opravdový mistr svého oboru. Klempířské prvky z mědi vypadají úchvatně a krov je perfektně provedený. Velká spokojenost." },
];

const Reviews = () => {
  return (
    <section id="recenze" className="py-24 md:py-32 bg-cream-deep/80 backdrop-blur-sm">
      <div className="container-wide">
        <Reveal className="grid md:grid-cols-12 gap-8 mb-14">
          <h2 className="md:col-span-8 font-display text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.05] text-balance">
            Spokojení zákazníci jsou <span className="italic text-copper">naše nejlepší vizitka.</span>
          </h2>
          <div className="md:col-span-4 md:pt-2">
            <div className="flex items-center gap-2 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-copper text-copper" />
              ))}
              <span className="text-sm text-ink ml-1 font-medium">5,0</span>
            </div>
            <p className="text-ink-soft text-sm">Z více než 200 realizovaných projektů.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="bg-card rounded-2xl shadow-card hover:shadow-elegant transition-shadow duration-500 p-6 md:p-8 flex flex-col"
            >
              <div className="flex mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-copper text-copper" />
                ))}
              </div>
              <p className="text-ink-soft leading-relaxed mb-8 flex-1">"{r.text}"</p>
              <div className="pt-5 border-t border-border">
                <div className="font-display text-xl text-ink">{r.name}</div>
                <div className="text-xs uppercase tracking-[0.25em] text-copper mt-1">{r.location}</div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
