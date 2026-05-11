const Footer = () => {
  return (
    <footer className="bg-ink text-cream">
      <div className="container-wide py-10 md:py-16 grid md:grid-cols-3 gap-8 md:gap-10">
        <div>
          <div className="font-display text-2xl">Střechy & Izolace</div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-copper-soft mt-1">Přemysl Nečas</div>
          <p className="text-cream/60 text-sm mt-6 leading-relaxed max-w-xs">
            Specialista na přírodní břidlici a kompletní realizace střech v okrese Šumperk.
          </p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-cream/50 mb-5">Kontakt</div>
          <div className="space-y-2 text-cream/85 text-sm">
            <div>737 012 244</div>
            <div>premyslnecas@seznam.cz</div>
            <div>Leština, okres Šumperk</div>
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-cream/50 mb-5">Služby</div>
          <ul className="space-y-2 text-cream/85 text-sm">
            <li>Přírodní břidlice</li>
            <li>Pokrývačské práce</li>
            <li>Klempířství & Krovy</li>
            <li>Izolace & Střešní okna</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-wide py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-cream/50">
          <div>© {new Date().getFullYear()} Přemysl Nečas — Všechna práva vyhrazena.</div>
          <div>Řemeslo s respektem k tradici.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
