import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import Reveal from "@/components/Reveal";

const Contact = () => {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      toast.success("Děkujeme! Ozveme se vám do 24 hodin.");
      (e.target as HTMLFormElement).reset();
      setSending(false);
    }, 800);
  };

  return (
    <section id="kontakt" className="py-24 md:py-32">
      <div className="container-wide grid md:grid-cols-12 gap-10 md:gap-16">
        <Reveal className="md:col-span-5">
          <span className="eyebrow">Kontakt</span>
          <h2 className="font-display text-4xl md:text-6xl text-ink mt-4 leading-[1.05] text-balance">
            Pošlete nám <span className="italic text-copper">nezávaznou poptávku.</span>
          </h2>
          <p className="text-ink-soft mt-6 leading-relaxed">
            Ozveme se vám do 24 hodin. Konzultace a cenová nabídka zdarma.
          </p>

          <div className="mt-10 border-t border-border">
            <a href="tel:737012244" className="flex items-center gap-5 py-5 border-b border-border group transition-colors hover:bg-cream-deep/50 -mx-3 px-3 rounded-xl">
              <Phone className="w-5 h-5 text-copper" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Telefon</div>
                <div className="font-display text-xl text-ink">737 012 244</div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink/30 group-hover:text-copper group-hover:translate-x-1 transition-all" />
            </a>
            <a href="mailto:premyslnecas@seznam.cz" className="flex items-center gap-5 py-5 border-b border-border group transition-colors hover:bg-cream-deep/50 -mx-3 px-3 rounded-xl">
              <Mail className="w-5 h-5 text-copper" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Email</div>
                <div className="font-display text-xl text-ink break-all">premyslnecas@seznam.cz</div>
              </div>
              <ArrowRight className="w-4 h-4 text-ink/30 group-hover:text-copper group-hover:translate-x-1 transition-all" />
            </a>
            <div className="flex items-center gap-5 py-5 border-b border-border">
              <MapPin className="w-5 h-5 text-copper" strokeWidth={1.5} />
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Sídlo</div>
                <div className="font-display text-xl text-ink">Leština · Okres Šumperk</div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="md:col-span-7">
          <form onSubmit={onSubmit} className="bg-card rounded-3xl shadow-elegant p-8 md:p-12">
            <h3 className="font-display text-3xl text-ink mb-8">Poptávkový formulář</h3>
            <div className="space-y-5">
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">Jméno</label>
                <Input required placeholder="Vaše jméno" className="h-12 rounded-xl border-border bg-background" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">Telefon</label>
                  <Input required type="tel" placeholder="+420" className="h-12 rounded-xl border-border bg-background" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">Email</label>
                  <Input required type="email" placeholder="vas@email.cz" className="h-12 rounded-xl border-border bg-background" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 block">Popis poptávky</label>
                <Textarea required rows={5} placeholder="Stručně popište typ střechy, lokalitu a vaši představu..." className="rounded-xl border-border bg-background" />
              </div>
              <Button type="submit" variant="ink" size="xl" className="w-full" disabled={sending}>
                {sending ? "Odesílám..." : "Odeslat poptávku"} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
