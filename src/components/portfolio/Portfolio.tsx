import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import {
  Code2, Layout, Figma, Globe, Search, Users, Zap, ShieldCheck,
  Smartphone, Sparkles, RefreshCw, LifeBuoy, Github, Linkedin, Mail,
  ExternalLink, ArrowRight, Star, Briefcase, Send, MapPin, Menu, X,
  Rocket, Terminal, Palette, Database, GitBranch, Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

import profileAsset from "@/assets/zain-profile.jpg.asset.json";
const profile = profileAsset.url;
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

const CONTACT_EMAIL = "zaingill0770@gmail.com";
/* ---------- social links ---------- */
const LINKEDIN_URL = "https://www.linkedin.com/in/zain-ul-abdeen-0853b539b";
const FIVERR_URL = "https://www.fiverr.com/s/R7L34w8";

/* ---------- Fiverr icon (lucide-style) ---------- */
function FiverrIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.3 10.6h-2.4v-.6c0-.7.5-1 1.2-1h1V6.4h-1.4c-2.4 0-3.9 1.3-3.9 3.6v.6H9.5v-.6c0-.7.5-1 1.2-1h.9V6.4h-1.3c-2.4 0-3.9 1.3-3.9 3.6v.6H4.8v2.6h1.6v5.4h3.1v-5.4h3.3v5.4h3.1v-5.4h2.4v-2.6zM17.3 5.6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    </svg>
  );
}

/* ---------- initials avatar ---------- */
function Avatar({ name, className }: { name: string; className?: string }) {
  const initials = name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase();
  // deterministic hue from name
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(135deg, hsl(${hue} 70% 45%), hsl(${(hue + 40) % 360} 70% 35%))`,
      }}
      aria-label={name}
    >
      <span className="text-sm font-semibold text-white">{initials}</span>
    </div>
  );
}

/* ---------- helpers ---------- */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function Section({
  id, eyebrow, title, subtitle, children,
}: { id: string; eyebrow?: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div {...fadeUp} className="mx-auto mb-14 max-w-2xl text-center">
          {eyebrow && (
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium tracking-wider uppercase text-primary">
              <Sparkles className="h-3 w-3" /> {eyebrow}
            </span>
          )}
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            {title.split(" ").map((w, i) =>
              i === title.split(" ").length - 1
                ? <span key={i} className="text-gradient">{w}</span>
                : <span key={i}>{w} </span>
            )}
          </h2>
          {subtitle && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2, ease: "easeOut",
      onUpdate: (v) => setVal(Math.floor(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------- data ---------- */
const services = [
  { icon: Code2, title: "React JS Development", items: ["Responsive Websites", "Single Page Applications", "React Components", "API Integration"] },
  { icon: Layout, title: "Frontend Development", items: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "Bootstrap"] },
  { icon: Figma, title: "Figma to React", items: ["Pixel Perfect Conversion", "Responsive UI", "Clean Code"] },
  { icon: Globe, title: "WordPress Development", items: ["Elementor Websites", "Business Websites", "Landing Pages", "WooCommerce"] },
  { icon: Search, title: "SEO Optimization", items: ["On Page SEO", "Technical SEO", "Off Page SEO", "Speed Optimization"] },
  { icon: Users, title: "B2B Lead Generation", items: ["Verified Email Lists", "LinkedIn Leads", "Decision Makers", "Data Research"] },
];

const skillGroups = [
  { title: "Frontend", skills: [
    { name: "HTML", value: 98 }, { name: "CSS", value: 96 }, { name: "JavaScript", value: 92 },
    { name: "React JS", value: 94 }, { name: "Next JS", value: 85 }, { name: "Tailwind CSS", value: 96 }, { name: "Bootstrap", value: 90 },
  ]},
  { title: "Backend", skills: [{ name: "Firebase", value: 85 }, { name: "REST APIs", value: 88 }] },
  { title: "CMS", skills: [{ name: "WordPress", value: 95 }, { name: "Elementor", value: 96 }] },
  { title: "SEO", skills: [{ name: "On Page", value: 92 }, { name: "Technical SEO", value: 88 }, { name: "Off Page", value: 85 }] },
  { title: "Marketing", skills: [{ name: "Lead Generation", value: 94 }, { name: "Email Research", value: 92 }, { name: "LinkedIn Research", value: 90 }] },
  { title: "Tools", skills: [
    { name: "Git", value: 92 }, { name: "GitHub", value: 92 }, { name: "VS Code", value: 98 },
    { name: "Figma", value: 88 }, { name: "Canva", value: 85 }, { name: "Google Sheets", value: 90 },
  ]},
];

const projects = [
  { img: p1, title: "Modern React Website", desc: "Analytics-forward SaaS dashboard with modular components and API integration.", tech: ["React", "TypeScript", "Tailwind"] },
  { img: p2, title: "Figma to React Conversion", desc: "Pixel-perfect handoff turned into a responsive, accessible React interface.", tech: ["React", "Figma", "CSS"] },
  { img: p3, title: "WordPress Business Website", desc: "Elementor-built corporate site with fast load times and CMS flexibility.", tech: ["WordPress", "Elementor", "PHP"] },
  { img: p4, title: "SEO Optimization Project", desc: "Technical + on-page SEO overhaul that lifted organic traffic 3× in 90 days.", tech: ["SEO", "GSC", "Ahrefs"] },
  { img: p5, title: "Lead Generation Dashboard", desc: "B2B outreach tool with verified email lists and LinkedIn prospecting.", tech: ["Sheets", "Apollo", "LinkedIn"] },
  { img: p6, title: "Landing Page Design", desc: "High-converting SaaS landing page with animated hero and clean sections.", tech: ["React", "Motion", "Tailwind"] },
];

const whyItems = [
  { icon: Rocket, title: "Fast Delivery", text: "Deadlines respected. Milestones tracked." },
  { icon: Star, title: "100% Client Satisfaction", text: "Consistent 5-star reviews from clients." },
  { icon: Smartphone, title: "Responsive Design", text: "Beautiful on every device, first-class mobile." },
  { icon: Code2, title: "Clean Code", text: "Maintainable, documented, production-ready." },
  { icon: Search, title: "SEO Friendly", text: "Semantic markup, fast loads, ranking-ready." },
  { icon: LifeBuoy, title: "Lifetime Support", text: "I stay available after the project ships." },
  { icon: RefreshCw, title: "Unlimited Revisions", text: "We iterate until you're genuinely happy." },
  { icon: ShieldCheck, title: "NDA Friendly", text: "Discreet, professional, contract-ready." },
];

const timeline = [
  { year: "2020", title: "Started as Frontend Developer", text: "Building responsive websites with HTML, CSS, and JavaScript." },
  { year: "2021", title: "Mastered React & Modern Stack", text: "Shipped React SPAs and component libraries for early-stage startups." },
  { year: "2022", title: "WordPress & Elementor Expert", text: "Delivered 40+ Elementor sites for agencies and small businesses." },
  { year: "2023", title: "SEO Specialist", text: "On-page, technical and off-page SEO for global clients." },
  { year: "2024", title: "Lead Generation Expert", text: "Verified B2B lists and LinkedIn prospecting at scale." },
  { year: "2025", title: "Full Digital Solutions", text: "End-to-end websites, SEO and lead pipelines for growth-stage brands." },
];

const testimonials = [
  { name: "Ahmed Khan", role: "Founder, NexaCloud", stars: 5,
    text: "Zain rebuilt our React dashboard from scratch. Fast, clean and pixel-perfect from Figma. Would hire again in a heartbeat." },
  { name: "Sophia Martinez", role: "Marketing Lead, BrightLabs", stars: 5,
    text: "Our organic traffic tripled in three months. Zain's SEO work is meticulous and results-driven." },
  { name: "Daniel Weber", role: "CEO, LeadForge", stars: 5,
    text: "Verified leads that actually convert. Best B2B researcher I've worked with on Fiverr." },
  { name: "Luca Romano", role: "CTO, Formaggi.io", stars: 5,
    text: "Elementor build shipped 2 days early and the site loads faster than our old React app." },
  { name: "Amelia Chen", role: "PM, DriftUX", stars: 5,
    text: "Communication was flawless. He genuinely cares about your product." },
  { name: "Marcus Bell", role: "Founder, Reachly", stars: 5,
    text: "Landing page conversion jumped from 1.8% to 5.4%. Enough said." },
];

/* ---------- Nav ---------- */
function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["About", "about"], ["Services", "services"], ["Skills", "skills"],
    ["Work", "portfolio"], ["Contact", "contact"],
  ];
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass-strong" : ""}`}>
          <a href="#top" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">Z</span>
            <span>Zain Ul Abdeen<span className="text-secondary">.</span></span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild variant="default" className="rounded-full bg-gradient-to-r from-primary to-primary/70 hover:opacity-90 glow-blue">
              <a href="#contact">Hire Me <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden" aria-label="Toggle menu">
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-2 rounded-2xl glass-strong p-4 md:hidden">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm hover:bg-white/5">{label}</a>
            ))}
            <Button asChild className="mt-2 rounded-full bg-gradient-to-r from-primary to-primary/70">
              <a href="#contact" onClick={() => setOpen(false)}>Hire Me</a>
            </Button>
          </motion.div>
        )}
      </div>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const floatIcons = [
    { Icon: Code2, top: "12%", left: "6%", delay: 0 },
    { Icon: Palette, top: "22%", left: "88%", delay: 0.4 },
    { Icon: Terminal, top: "70%", left: "4%", delay: 0.8 },
    { Icon: Database, top: "78%", left: "92%", delay: 1.2 },
    { Icon: GitBranch, top: "48%", left: "2%", delay: 1.6 },
    { Icon: Chrome, top: "8%", left: "48%", delay: 2 },
  ];

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      {/* animated background */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/30 blur-3xl animate-pulse-glow" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-secondary/20 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* floating tech icons */}
      {floatIcons.map(({ Icon, top, left, delay }, i) => (
        <motion.div key={i} className="pointer-events-none absolute hidden md:block"
          style={{ top, left }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.8 }}>
          <div className="animate-float rounded-2xl glass p-3" style={{ animationDelay: `${delay}s` }}>
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </motion.div>
      ))}

      <motion.div style={{ y, opacity }} className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" /> Available for freelance projects
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Hi, I'm <span className="text-gradient">Zain Ul Abdeen</span>
            <span className="block text-3xl font-medium text-muted-foreground sm:text-4xl lg:text-5xl mt-3">
              I build digital products that convert.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="mt-5 max-w-xl text-sm font-medium tracking-wide text-primary/90">
            Freelance Web Developer · React JS · WordPress Expert · SEO Specialist · Lead Generation Expert
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Helping businesses build fast, responsive, SEO-optimized websites and generate quality leads that grow their business.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary/70 text-primary-foreground glow-blue hover:opacity-95">
              <a href="#contact">Hire Me <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 hover:bg-white/10">
              <a href="#portfolio">View Portfolio</a>
            </Button>
            <Button asChild size="lg" variant="ghost" className="rounded-full hover:bg-white/5">
              <a href="#contact">Contact Me</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-10 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-secondary text-secondary" /> 5.0 avg rating</div>
            <div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" /> 100+ projects delivered</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}
          className="relative">
          <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 blur-2xl" />
          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-full border-4 border-white/10 glass-strong ring-4 ring-primary/20">
            <img
              src={profile}
              alt="Zain Ul Abdeen — Freelance Web Developer"
              width={800}
              height={800}
              loading="eager"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          {/* floating stat card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="absolute -bottom-6 -left-6 hidden rounded-2xl glass-strong p-4 shadow-elegant sm:block animate-float-slow">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/20 text-secondary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Delivery time</div>
                <div className="text-sm font-semibold">On-time, every time</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
            className="absolute -top-4 -right-4 hidden rounded-2xl glass-strong p-4 sm:block animate-float-slow" style={{ animationDelay: "1s" }}>
            <div className="flex items-center gap-2 text-sm">
            <div className="flex -space-x-2">
                <Avatar name="Ahmed Khan" className="grid h-7 w-7 place-items-center rounded-full border-2 border-background" />
                <Avatar name="Sophia Martinez" className="grid h-7 w-7 place-items-center rounded-full border-2 border-background" />
                <Avatar name="Daniel Weber" className="grid h-7 w-7 place-items-center rounded-full border-2 border-background" />
              </div>
              <span className="font-medium">50+ happy clients</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <Section id="about" eyebrow="About Me" title="Building the web, one pixel at a time"
      subtitle="I partner with startups, agencies and established businesses to build digital solutions that look premium and perform even better.">
      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div {...fadeUp} className="rounded-3xl glass p-8 lg:col-span-2">
          <div className="mb-6 flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/50 to-secondary/40 blur" />
              <img
                src={profile}
                alt="Zain Ul Abdeen"
                width={96}
                height={96}
                loading="lazy"
                decoding="async"
                className="relative h-20 w-20 rounded-full object-cover ring-2 ring-primary/30 sm:h-24 sm:w-24"
              />
            </div>
            <div className="min-w-0">
              <div className="text-lg font-semibold">Zain Ul Abdeen</div>
              <div className="text-sm text-muted-foreground">Freelance Web Developer</div>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-foreground/90">
            I'm <span className="font-semibold text-foreground">Zain Ul Abdeen</span> — a freelance web developer and digital
            solutions expert focused on outcomes, not just deliverables. Over the last four+ years I've helped founders and
            marketing teams turn ideas into fast, responsive, SEO-optimized websites that actually generate leads.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            From <span className="text-primary font-medium">React JS</span> single-page applications to
            <span className="text-primary font-medium"> Elementor-powered WordPress</span> business sites,
            I blend clean engineering with a marketer's eye for conversion. I also run technical &amp; on-page
            <span className="text-primary font-medium"> SEO</span> audits and build
            <span className="text-primary font-medium"> B2B lead generation</span> pipelines that fill your calendar.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["React JS", "Frontend", "WordPress", "Elementor", "SEO", "Lead Generation"].map(t => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp} transition={{ delay: 0.15, duration: 0.6 }} className="grid grid-cols-2 gap-4">
          {[
            { label: "Years", value: "4+" },
            { label: "Projects", value: "100+" },
            { label: "Clients", value: "50+" },
            { label: "Countries", value: "20+" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl glass p-6 text-center">
              <div className="text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
            </div>
          ))}
          <div className="col-span-2 rounded-2xl glass p-6">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-secondary" />
              <div>
                <div className="text-sm text-muted-foreground">Working with clients worldwide</div>
                <div className="font-medium">Remote · Full-time freelance</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ---------- Services ---------- */
function Services() {
  return (
    <Section id="services" eyebrow="Services" title="What I do best"
      subtitle="End-to-end web and growth services — from first pixel to first paying customer.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl glass p-7 transition-all hover:border-primary/40"
          >
            <div className="absolute -top-24 -right-24 h-52 w-52 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative">
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/20 text-primary">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <ul className="mt-4 space-y-2">
                {s.items.map(it => (
                  <li key={it} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-secondary" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Skills ---------- */
function SkillBar({ name, value, delay }: { name: string; value: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });
  const [v, setV] = useState(0);
  useEffect(() => { if (inView) setTimeout(() => setV(value), delay); }, [inView, value, delay]);
  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-foreground/90">{name}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={v} className="h-2 bg-white/5 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-secondary" />
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools of the trade"
      subtitle="A modern toolkit for building, ranking and scaling web products.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, gi) => (
          <motion.div key={g.title}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: gi * 0.06 }}
            className="rounded-3xl glass p-7">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{g.title}</h3>
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{g.skills.length}</span>
            </div>
            <div className="space-y-4">
              {g.skills.map((s, i) => <SkillBar key={s.name} {...s} delay={i * 80} />)}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Portfolio ---------- */
function PortfolioGrid() {
  return (
    <Section id="portfolio" eyebrow="Portfolio" title="Selected recent work"
      subtitle="A handful of projects across React, WordPress, SEO and lead generation.">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.article key={p.title}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.55, delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="group overflow-hidden rounded-3xl glass">
            <div className="relative overflow-hidden">
              <img src={p.img} alt={p.title} width={1024} height={640} loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map(t => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
              <div className="mt-5 flex gap-2">
                <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-primary to-primary/70">
                  <a href="#"><ExternalLink className="mr-1 h-3.5 w-3.5" /> Live Demo</a>
                </Button>
                <Button asChild size="sm" variant="outline" className="rounded-full border-white/15 bg-white/5">
                  <a href="#"><Github className="mr-1 h-3.5 w-3.5" /> Source</a>
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Why ---------- */
function Why() {
  return (
    <Section id="why" eyebrow="Why Choose Me" title="Freelance without the compromises"
      subtitle="Agency-level quality with a direct line to the person actually building it.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {whyItems.map((w, i) => (
          <motion.div key={w.title}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl glass p-6">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-secondary/15 text-secondary">
              <w.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold">{w.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">{w.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Timeline ---------- */
function Timeline() {
  return (
    <Section id="experience" eyebrow="Experience" title="A journey in shipping"
      subtitle="Six years of building for clients across the web stack.">
      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent md:left-1/2" />
        <div className="space-y-10">
          {timeline.map((e, i) => {
            const right = i % 2 === 1;
            return (
              <motion.div key={e.year}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.5 }}
                className={`relative grid grid-cols-[2rem_1fr] items-start gap-4 md:grid-cols-2 md:gap-12 ${right ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className={`hidden md:block ${right ? "text-left" : "text-right"}`}>
                  <div className="rounded-2xl glass p-6 inline-block max-w-md text-left">
                    <div className="text-xs font-semibold uppercase tracking-wider text-secondary">{e.year}</div>
                    <h3 className="mt-1 text-lg font-semibold">{e.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{e.text}</p>
                  </div>
                </div>
                <div className="relative md:mx-auto">
                  <div className="absolute left-4 top-3 -translate-x-1/2 md:left-0 md:-translate-x-[calc(50%+3rem)]">
                    <div className="h-4 w-4 rounded-full bg-gradient-to-br from-primary to-secondary ring-4 ring-background" />
                  </div>
                </div>
                <div className="md:hidden">
                  <div className="rounded-2xl glass p-5">
                    <div className="text-xs font-semibold uppercase tracking-wider text-secondary">{e.year}</div>
                    <h3 className="mt-1 text-base font-semibold">{e.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{e.text}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="Clients love the work"
      subtitle="Real feedback from founders and marketing leaders I've worked with.">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
            className="rounded-3xl glass p-6">
            <div className="flex items-center gap-1 text-secondary">
              {Array.from({ length: t.stars }).map((_, s) => <Star key={s} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.text}"</p>
            <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
              <Avatar name={t.name} className="grid h-11 w-11 place-items-center rounded-full ring-2 ring-primary/30" />
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Stats ---------- */
function Stats() {
  const stats = [
    { v: 100, s: "+", l: "Projects Completed" },
    { v: 50, s: "+", l: "Happy Clients" },
    { v: 4, s: "", l: "Core Services" },
    { v: 100, s: "%", l: "Client Satisfaction" },
  ];
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-3xl glass-strong p-10">
          <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} />
          <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map(s => (
              <div key={s.l} className="text-center">
                <div className="text-4xl font-bold text-gradient sm:text-5xl">
                  <Counter to={s.v} suffix={s.s} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground sm:text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "loading") return;

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      subject: String(fd.get("subject") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };

    if (!payload.name || !payload.email || !payload.subject || !payload.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          _subject: `Portfolio Contact: ${payload.subject}`,
          subject: payload.subject,
          message: payload.message,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
      toast.success("Message sent! I'll get back within 24 hours.");
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
      toast.error("Failed to send message. Please email me directly.");
    }
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something great"
      subtitle="Tell me about your project — I'll respond within 24 hours.">
      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div {...fadeUp} className="rounded-3xl glass p-8 lg:col-span-2">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/50 to-secondary/40 blur" />
              <img
                src={profile}
                alt="Zain Ul Abdeen"
                width={112}
                height={112}
                loading="lazy"
                decoding="async"
                className="relative h-28 w-28 rounded-full object-cover ring-2 ring-primary/30"
              />
            </div>
            <h3 className="mt-4 text-xl font-semibold">Get in touch</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Available for freelance projects, part-time contracts and long-term partnerships.
            </p>
          </div>
          <div className="mt-6 space-y-4 text-sm">
            <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 text-foreground/90 hover:text-primary">
              <Mail className="h-4 w-4 text-primary" /> {CONTACT_EMAIL}
            </a>
            <div className="flex items-center gap-3 text-foreground/90">
              <MapPin className="h-4 w-4 text-primary" /> Working remotely, worldwide
            </div>
          </div>
          <div className="mt-8">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Find me on</div>
            <div className="mt-3 flex gap-3">
              {[
                { Icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn", external: true },
                { Icon: FiverrIcon, href: FIVERR_URL, label: "Fiverr", external: true },
                { Icon: Github, href: "#", label: "GitHub", external: false },
                { Icon: Mail, href: `mailto:${CONTACT_EMAIL}`, label: "Email", external: false },
              ].map(({ Icon, href, label, external }, i) => (
                <a key={i} href={href} aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form {...fadeUp} transition={{ delay: 0.15, duration: 0.6 }}
          onSubmit={onSubmit} noValidate className="rounded-3xl glass p-8 lg:col-span-3">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cf-name" className="text-xs text-muted-foreground">Name</label>
              <Input id="cf-name" name="name" required maxLength={100} placeholder="Your name" className="mt-1 border-white/10 bg-white/5" />
            </div>
            <div>
              <label htmlFor="cf-email" className="text-xs text-muted-foreground">Email</label>
              <Input id="cf-email" name="email" required type="email" maxLength={255} placeholder="you@company.com" className="mt-1 border-white/10 bg-white/5" />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="cf-subject" className="text-xs text-muted-foreground">Subject</label>
            <Input id="cf-subject" name="subject" required maxLength={160} placeholder="What's this about?" className="mt-1 border-white/10 bg-white/5" />
          </div>
          <div className="mt-4">
            <label htmlFor="cf-message" className="text-xs text-muted-foreground">Message</label>
            <Textarea id="cf-message" name="message" required maxLength={2000} placeholder="Tell me about your project…" rows={6} className="mt-1 border-white/10 bg-white/5" />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={status === "loading"}
            className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-primary/70 glow-blue disabled:opacity-70"
          >
            {status === "loading" ? (
              <>Sending… <RefreshCw className="ml-1 h-4 w-4 animate-spin" /></>
            ) : (
              <>Send Message <Send className="ml-1 h-4 w-4" /></>
            )}
          </Button>
          {status === "success" && (
            <p className="mt-3 text-center text-sm text-green-400">Thanks! Your message has been sent successfully.</p>
          )}
          {status === "error" && (
            <p className="mt-3 text-center text-sm text-red-400">
              Something went wrong. Please email me at {CONTACT_EMAIL}.
            </p>
          )}
        </motion.form>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 sm:flex sm:justify-between">
        <div className="min-w-0 flex items-center gap-2 text-sm">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-primary-foreground text-sm font-bold">Z</span>
          <span className="truncate text-muted-foreground">© {new Date().getFullYear()} Zain Ul Abdeen. Crafted with care.</span>
        </div>
        <div className="flex shrink-0 gap-2">
          {[
            { Icon: Linkedin, href: LINKEDIN_URL, label: "LinkedIn", external: true },
            { Icon: FiverrIcon, href: FIVERR_URL, label: "Fiverr", external: true },
            { Icon: Github, href: "#", label: "GitHub", external: false },
            { Icon: Mail, href: `mailto:${CONTACT_EMAIL}`, label: "Email", external: false },
          ].map(({ Icon, href, label, external }, i) => (
            <a key={i} href={href} aria-label={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ---------- Main ---------- */
export default function Portfolio() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <PortfolioGrid />
        <Why />
        <Timeline />
        <Testimonials />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
