import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plane, Phone, Instagram, MapPin, Mail, MessageCircle, Menu, X,
  Briefcase, GraduationCap, Heart, Users, Sparkles, BedDouble,
  ShieldCheck, BadgeIndianRupee, Compass, Headphones, Clock,
  Star, ArrowRight, Calendar, Send, Building, Car, Train, Ship,
  Globe, Mountain, Waves, Sun, Camera, Coffee,
} from "lucide-react";

import heroImg from "@/assets/hero-kerala.jpg";
import dMunnar from "@/assets/dest-munnar.jpg";
import dManali from "@/assets/dest-manali.jpg";
import dGoa from "@/assets/dest-goa.jpg";
import dOoty from "@/assets/dest-ooty.jpg";
import dAgra from "@/assets/dest-agra.jpg";
import dKodai from "@/assets/dest-kodai.jpg";
import dHampi from "@/assets/dest-hampi.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import { useSiteData } from "@/context/SiteDataContext";

const IMG_MAP: Record<string, string> = {
  "hero-kerala": heroImg, "dest-munnar": dMunnar, "dest-manali": dManali,
  "dest-goa": dGoa, "dest-ooty": dOoty, "dest-agra": dAgra,
  "dest-kodai": dKodai, "dest-hampi": dHampi,
  "gallery-1": g1, "gallery-2": g2, "gallery-3": g3, "gallery-4": g4,
};
function getImg(key: string) { 
  // If it's already a URL or data URL, return directly
  if (key.startsWith("http") || key.startsWith("data:")) {
    return key;
  }
  // Otherwise use predefined image
  return IMG_MAP[key] ?? heroImg; 
}

const ICON_MAP: Record<string, React.ElementType> = {
  Briefcase, GraduationCap, Heart, Users, Sparkles, BedDouble,
  ShieldCheck, BadgeIndianRupee, Compass, Headphones, Star,
  Phone, MapPin, Plane, Camera, Coffee, Mountain, Waves,
  Sun, Globe, Building, Car, Train, Ship, Mail, Instagram,
};
function getIcon(name: string): React.ElementType { return ICON_MAP[name] ?? Star; }

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gokulam Holidays — Tour Packages from Kerala Across India" },
      { name: "description", content: "Premium tour agency in Palakkad & Thrissur, Kerala." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav /><Hero /><About /><Services /><Destinations />
      <Packages /><WhyUs /><Gallery /><Testimonials /><Contact />
      <Footer /><FloatingWhats /><MobileBottomNav />
    </div>
  );
}

function Nav() {
  const { data } = useSiteData();
  const { phone, phoneDisplay } = data.contact;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    f(); window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const links = [["Home","#home"],["About","#about"],["Services","#services"],["Destinations","#destinations"],["Packages","#packages"],["Contact","#contact"]];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "glass-light shadow-card" : "bg-transparent"}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <a href="#home" className="flex items-center gap-2">
          <div className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--gradient-primary)] shadow-elegant">
            <Plane className="w-5 h-5 text-white -rotate-45" />
          </div>
          <div className="leading-tight">
            <div className={`font-display font-extrabold text-base sm:text-lg ${scrolled ? "text-foreground" : "text-white"}`}>GOKULAM</div>
            <div className={`text-[10px] tracking-[0.25em] ${scrolled ? "text-muted-foreground" : "text-white/80"}`}>HOLIDAYS</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(([l,h]) => <a key={h} href={h} className={`text-sm font-medium transition-colors ${scrolled ? "text-foreground/80 hover:text-accent" : "text-white/90 hover:text-accent-glow"}`}>{l}</a>)}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href={`tel:${phone}`} className={`text-sm font-semibold flex items-center gap-2 ${scrolled ? "text-foreground" : "text-white"}`}><Phone className="w-4 h-4" /> {phoneDisplay}</a>
          <a href="#contact" className="px-5 py-2.5 rounded-full bg-[var(--gradient-accent)] text-white text-sm font-semibold shadow-glow hover:scale-105 transition-transform">Book Now</a>
        </div>
        <button onClick={() => setOpen(!open)} className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }} className="lg:hidden glass-light border-t border-border">
            <div className="px-6 py-4 flex flex-col gap-3">
              {links.map(([l,h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-2 text-foreground font-medium">{l}</a>)}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-2 px-5 py-3 rounded-full bg-[var(--gradient-accent)] text-white text-center font-semibold">Book Now</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { data } = useSiteData();
  const h = data.hero;
  const slides = [heroImg, dManali, dGoa];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(x => (x+1)%slides.length), 6000); return () => clearInterval(t); }, []);
  return (
    <section id="home" className="relative min-h-[100svh] flex items-center overflow-hidden">
      <AnimatePresence>
        <motion.img key={i} src={slides[i]} alt="Travel" width={1920} height={1080}
          initial={{ opacity:0, scale:1.1 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
          transition={{ duration:1.6, ease:"easeOut" }} className="absolute inset-0 w-full h-full object-cover" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/55 to-accent/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-28 pb-20 w-full">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.8 }}
          className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-white/90 text-xs sm:text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4 text-accent-glow" /> {h.badge}
        </motion.div>
        <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.1 }}
          className="text-white font-extrabold text-4xl sm:text-6xl lg:text-7xl max-w-4xl leading-[1.05]">
          {h.headline1}{" "}<span className="block bg-gradient-to-r from-accent-glow to-accent bg-clip-text text-transparent">{h.headline2}</span>
        </motion.h1>
        <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.25 }}
          className="mt-6 text-base sm:text-xl text-white/85 max-w-2xl">{h.subtext}</motion.p>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.9, delay:0.4 }} className="mt-9 flex flex-wrap gap-4">
          <a href="#packages" className="group px-7 py-4 rounded-full bg-[var(--gradient-accent)] text-white font-semibold shadow-glow hover:scale-105 transition-transform flex items-center gap-2">
            Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="px-7 py-4 rounded-full glass text-white font-semibold hover:bg-white/20 transition-colors flex items-center gap-2">
            <Phone className="w-4 h-4" /> Contact Us
          </a>
        </motion.div>
        <div className="mt-12 flex gap-2">
          {slides.map((_,k) => <button key={k} onClick={() => setI(k)} aria-label={`Slide ${k+1}`} className={`h-1.5 rounded-full transition-all ${k===i ? "w-10 bg-accent" : "w-5 bg-white/40"}`} />)}
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-8">
          <div className="glass rounded-2xl p-5 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-white">
            {h.stats.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-extrabold">{s.value}</div>
                <div className="text-xs sm:text-sm text-white/75">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { data } = useSiteData();
  const { aboutMission, aboutVision, aboutRating, aboutRatingLabel } = data.meta;
  return (
    <Section id="about" eyebrow="About Us" title={<>Crafting journeys from the <span className="text-gradient">heart of Kerala</span></>}>
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} className="relative">
          <img src={heroImg} alt="Kerala" width={1920} height={1280} loading="lazy" className="rounded-3xl shadow-elegant aspect-[4/3] object-cover" />
          <div className="absolute -bottom-6 -right-6 glass-light rounded-2xl p-5 shadow-card max-w-xs hidden sm:block">
            <div className="flex items-center gap-2 text-accent font-bold"><Star className="w-5 h-5 fill-accent" /> {aboutRating}</div>
            <p className="text-sm text-muted-foreground mt-1">{aboutRatingLabel}</p>
          </div>
        </motion.div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }}>
          <p className="text-lg text-muted-foreground leading-relaxed">Gokulam Holidays is a Kerala-born tour agency with operations in <strong className="text-foreground">Palakkad & Thrissur</strong>. We design memorable journeys for corporates, students, families and honeymooners — anywhere in India and beyond.</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-8">
            {[{t:"Our Mission",d:aboutMission},{t:"Our Vision",d:aboutVision}].map(x => (
              <div key={x.t} className="p-5 rounded-2xl bg-secondary border border-border">
                <h3 className="font-bold text-lg">{x.t}</h3>
                <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
              </div>
            ))}
          </div>
          <a href="#contact" className="inline-flex items-center gap-2 mt-8 text-accent font-semibold hover:gap-3 transition-all">Plan your trip with us <ArrowRight className="w-4 h-4" /></a>
        </motion.div>
      </div>
    </Section>
  );
}

function Services() {
  const { data } = useSiteData();
  return (
    <Section id="services" eyebrow="What We Do" title={<>Travel services for <span className="text-gradient">every kind of traveller</span></>}>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.services.map((x, k) => {
          const Icon = getIcon(x.icon);
          return (
            <motion.div key={k} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ delay:k*0.05 }}
              className="group relative p-7 rounded-3xl bg-card border border-border shadow-card hover:shadow-elegant transition-all hover:-translate-y-1">
              <div className="absolute inset-x-0 -top-px h-1 rounded-t-3xl bg-[var(--gradient-accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 rounded-2xl bg-[var(--gradient-primary)] grid place-items-center mb-5 shadow-elegant">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold">{x.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{x.description}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

function Destinations() {
  const { data } = useSiteData();
  return (
    <Section id="destinations" eyebrow="Popular Destinations" title={<>Where will your <span className="text-gradient">next story</span> begin?</>}>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {data.destinations.map((d, k) => (
          <motion.a key={k} href="#contact" variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ delay:k*0.04 }}
            className="group relative rounded-3xl overflow-hidden aspect-[3/4] shadow-card hover:shadow-elegant transition-all">
            <img src={getImg(d.imgKey)} alt={d.name} width={1024} height={1280} loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-accent-glow font-semibold">{d.tag}</div>
              <div className="text-lg sm:text-2xl font-extrabold mt-1 flex items-center justify-between">
                {d.name}<ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      <p className="text-center mt-10 text-muted-foreground">Plus exclusive <span className="font-semibold text-foreground">Kerala</span>, <span className="font-semibold text-foreground">South India</span> & <span className="font-semibold text-foreground">International</span> tour packages.</p>
    </Section>
  );
}

function Packages() {
  const { data } = useSiteData();
  return (
    <Section id="packages" eyebrow="Tour Packages" title={<>Hand-picked deals, <span className="text-gradient">honest pricing</span></>}>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.packages.map((p, k) => (
          <motion.div key={k} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ delay:k*0.05 }}
            className="group rounded-3xl overflow-hidden bg-card border border-border shadow-card hover:shadow-elegant transition-all hover:-translate-y-1 flex flex-col">
            <div className="relative aspect-[5/3] overflow-hidden">
              <img src={getImg(p.imgKey)} alt={p.name} width={1024} height={614} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 left-4 glass text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {p.days}
              </div>
              {p.badge && <div className="absolute top-4 right-4 bg-[var(--gradient-accent)] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-glow">{p.badge}</div>}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1"><MapPin className="w-3.5 h-3.5" /> {p.location}</p>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {p.inclusions.map(inc => <span key={inc} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">{inc}</span>)}
              </div>
              <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">Starting from</div>
                  <div className="text-2xl font-extrabold text-primary">₹{p.price.toLocaleString("en-IN")}<span className="text-xs font-normal text-muted-foreground">/person</span></div>
                </div>
                <a href="#contact" className="px-5 py-2.5 rounded-full bg-[var(--gradient-primary)] text-white text-sm font-semibold hover:scale-105 transition-transform">Book Now</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function WhyUs() {
  const { data } = useSiteData();
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-white">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">Why Choose Us</div>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold">A travel partner you can <span className="text-accent-glow">actually trust</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.whyUs.map((x, k) => {
            const Icon = getIcon(x.icon);
            return (
              <motion.div key={k} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} transition={{ delay:k*0.05 }}
                className="glass rounded-2xl p-6 hover:bg-white/20 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-accent grid place-items-center shadow-glow mb-4"><Icon className="w-6 h-6 text-white" /></div>
                <h3 className="text-lg font-bold">{x.title}</h3>
                <p className="text-sm text-white/80 mt-1.5">{x.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const { data } = useSiteData();
  return (
    <Section eyebrow="Gallery" title={<>Moments from <span className="text-gradient">real journeys</span></>}>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] gap-3 sm:gap-4">
        {data.gallery.map((im, k) => (
          <motion.div key={k} initial={{ opacity:0, scale:0.95 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:k*0.04 }}
            className={`relative overflow-hidden rounded-2xl group ${im.rowSpan === 2 ? "row-span-2" : ""}`}>
            <img src={getImg(im.imgKey)} alt="Travel moment" loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Testimonials() {
  const { data } = useSiteData();
  const ts = data.testimonials;
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!ts.length) return;
    const t = setInterval(() => setI(x => (x+1)%ts.length), 5000);
    return () => clearInterval(t);
  }, [ts.length]);
  const cur = ts[i % Math.max(ts.length,1)];
  if (!cur) return null;
  return (
    <Section eyebrow="Testimonials" title={<>Loved by <span className="text-gradient">10,000+ travellers</span></>}>
      <div className="relative max-w-3xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }}
            className="bg-card border border-border rounded-3xl p-8 sm:p-12 shadow-card text-center">
            <div className="flex justify-center gap-1 text-accent mb-5">
              {Array.from({length:5}).map((_,k) => <Star key={k} className="w-5 h-5 fill-accent" />)}
            </div>
            <p className="text-lg sm:text-2xl font-medium leading-relaxed">"{cur.quote}"</p>
            <div className="mt-6">
              <div className="font-bold">{cur.name}</div>
              <div className="text-sm text-muted-foreground">{cur.city} • {cur.tripType}</div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mt-6">
          {ts.map((_,k) => <button key={k} onClick={() => setI(k)} aria-label={`Testimonial ${k+1}`} className={`h-2 rounded-full transition-all ${k===i ? "w-8 bg-accent" : "w-2 bg-border"}`} />)}
        </div>
      </div>
    </Section>
  );
}

function Contact() {
  const { data } = useSiteData();
  const { phone, phoneDisplay, whatsapp, instagram, location } = data.contact;
  const [form, setForm] = useState({ name:"", phone:"", email:"", destination:"", message:"" });
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hi Gokulam Holidays!%0A%0AName: ${form.name}%0APhone: ${form.phone}%0AEmail: ${form.email}%0ADestination: ${form.destination}%0AMessage: ${form.message}`;
    window.open(`${whatsapp}?text=${msg}`, "_blank");
    setSent(true); setTimeout(() => setSent(false), 4000);
  };
  const instagramHandle = instagram.replace("https://instagram.com/","@");
  return (
    <Section id="contact" eyebrow="Get In Touch" title={<>Let's plan your <span className="text-gradient">next adventure</span></>}>
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[
            { i:Phone, t:"Call Us", d:phoneDisplay, h:`tel:${phone}` },
            { i:MessageCircle, t:"WhatsApp", d:"Quick reply, 7 days a week", h:whatsapp },
            { i:Instagram, t:"Instagram", d:instagramHandle, h:instagram },
            { i:MapPin, t:"Locations", d:location, h:"#" },
          ].map(x => (
            <a key={x.t} href={x.h} target={x.h.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:shadow-card hover:-translate-y-0.5 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[var(--gradient-primary)] grid place-items-center shadow-elegant shrink-0"><x.i className="w-5 h-5 text-white" /></div>
              <div className="min-w-0"><div className="font-bold">{x.t}</div><div className="text-sm text-muted-foreground truncate">{x.d}</div></div>
            </a>
          ))}
          <div className="rounded-2xl overflow-hidden border border-border shadow-card aspect-video">
            <iframe title="Map" src="https://maps.google.com/maps?q=Palakkad,Kerala&z=10&output=embed" className="w-full h-full" loading="lazy" />
          </div>
        </div>
        <form onSubmit={submit} className="lg:col-span-3 bg-card border border-border rounded-3xl p-6 sm:p-10 shadow-card space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your Name" v={form.name} on={v => setForm({...form,name:v})} required />
            <Field label="Phone" type="tel" v={form.phone} on={v => setForm({...form,phone:v})} required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Email" type="email" v={form.email} on={v => setForm({...form,email:v})} />
            <Field label="Destination" v={form.destination} on={v => setForm({...form,destination:v})} placeholder="e.g. Kerala, Manali..." />
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground/80">Message</label>
            <textarea required value={form.message} onChange={e => setForm({...form,message:e.target.value})} rows={4} placeholder="Tell us about your travel plans..."
              className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition" />
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" className="flex-1 group px-6 py-4 rounded-full bg-[var(--gradient-accent)] text-white font-semibold shadow-glow hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send via WhatsApp
            </button>
            <a href={`tel:${phone}`} className="sm:flex-none px-6 py-4 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2">
              <Phone className="w-4 h-4" /> Call Now
            </a>
          </div>
          {sent && <p className="text-sm text-accent font-semibold">Opening WhatsApp… we'll reply shortly!</p>}
        </form>
      </div>
    </Section>
  );
}

function Field({ label, v, on, type="text", required, placeholder }: { label:string; v:string; on:(v:string)=>void; type?:string; required?:boolean; placeholder?:string }) {
  return (
    <div>
      <label className="text-sm font-semibold text-foreground/80">{label}{required && " *"}</label>
      <input type={type} value={v} onChange={e => on(e.target.value)} required={required} placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition" />
    </div>
  );
}

function Footer() {
  const { data } = useSiteData();
  const { phone, phoneDisplay, instagram, location } = data.contact;
  const { footerTagline } = data.meta;
  const instagramHandle = instagram.replace("https://instagram.com/","@");
  return (
    <footer className="bg-primary text-white pt-16 pb-28 lg:pb-10 mt-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,var(--accent),transparent_40%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid place-items-center w-10 h-10 rounded-xl bg-[var(--gradient-accent)]"><Plane className="w-5 h-5 text-white -rotate-45" /></div>
            <div><div className="font-extrabold">GOKULAM</div><div className="text-[10px] tracking-[0.25em] text-white/70">HOLIDAYS</div></div>
          </div>
          <p className="text-sm text-white/70 mt-4">{footerTagline}</p>
        </div>
        <div>
          <h4 className="font-bold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {["About","Services","Destinations","Packages","Contact"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`} className="hover:text-accent-glow">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Services</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {data.services.slice(0,6).map(s => <li key={s.title}>{s.title}</li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-accent-glow" /><a href={`tel:${phone}`}>{phoneDisplay}</a></li>
            <li className="flex items-center gap-2"><Instagram className="w-4 h-4 text-accent-glow" /><a href={instagram} target="_blank" rel="noreferrer">{instagramHandle}</a></li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-accent-glow" /> {location}</li>
          </ul>
        </div>
      </div>
      <div className="relative mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/60 px-6">
        © {new Date().getFullYear()} Gokulam Holidays. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingWhats() {
  const { data } = useSiteData();
  return (
    <a href={data.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="fixed bottom-24 lg:bottom-6 right-5 z-40 w-14 h-14 rounded-full grid place-items-center shadow-glow bg-[oklch(0.7_0.18_150)] hover:scale-110 transition-transform">
      <MessageCircle className="w-6 h-6 text-white" />
      <span className="absolute inset-0 rounded-full animate-ping bg-[oklch(0.7_0.18_150)] opacity-30" />
    </a>
  );
}

function MobileBottomNav() {
  const { data } = useSiteData();
  const items = [
    { i:Compass, l:"Explore", h:"#destinations" },
    { i:Calendar, l:"Packages", h:"#packages" },
    { i:Phone, l:"Call", h:`tel:${data.contact.phone}` },
    { i:Mail, l:"Contact", h:"#contact" },
  ];
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 glass-light border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-4">
        {items.map(x => (
          <a key={x.l} href={x.h} className="flex flex-col items-center gap-1 py-3 text-xs font-medium text-foreground/80 hover:text-accent transition-colors">
            <x.i className="w-5 h-5" />{x.l}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Section({ id, eyebrow, title, children }: { id?:string; eyebrow:string; title:React.ReactNode; children:React.ReactNode }) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once:true }} className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-accent">{eyebrow}</div>
          <h2 className="mt-3 text-3xl sm:text-5xl font-extrabold text-foreground">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}
