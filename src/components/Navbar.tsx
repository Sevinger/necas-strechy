import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const links = [
  { href: "#sluzby", label: "Služby" },
  { href: "#o-nas", label: "O nás" },
  { href: "#recenze", label: "Recenze" },
  { href: "#kontakt", label: "Kontakt" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/80 backdrop-blur-xl shadow-card py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <a href="#" className="flex flex-col leading-tight">
          <span className="font-display text-lg text-ink tracking-tight">STŘECHY & IZOLACE</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-ink/60 mt-0.5">Přemysl Nečas</span>
        </a>
        <nav className="hidden md:flex items-center gap-9 text-sm text-ink/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative hover:text-copper transition-colors group">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-copper transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a href="tel:737012244" className="hidden md:flex items-center gap-2 text-sm text-ink/80 hover:text-copper transition-colors">
          <Phone className="w-4 h-4" /> 737 012 244
        </a>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="md:hidden p-2 text-ink"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border"
          >
            <nav className="container-wide py-6 flex flex-col gap-4 text-ink">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 hover:text-copper transition-colors">
                  {l.label}
                </a>
              ))}
              <a href="tel:737012244" className="flex items-center gap-2 text-copper pt-2 border-t border-border">
                <Phone className="w-4 h-4" /> 737 012 244
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
