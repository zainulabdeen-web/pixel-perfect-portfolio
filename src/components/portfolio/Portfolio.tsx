import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate } from "framer-motion";
import {
  Code2, Globe, Search, Users, Zap, ShieldCheck,
  Smartphone, Sparkles, LifeBuoy, Github, Linkedin, Mail,
  ArrowRight, Star, Briefcase, MapPin, Menu, X,
  Terminal, Palette, Database, GitBranch, Chrome,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import profileAsset from "@/assets/zain-profile.jpg.asset.json";
const profile = profileAsset.url;
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";

const CONTACT_EMAIL = "zaingill77665@gmail.com";
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

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2, ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{val.toFixed(decimals)}{suffix}</span>;
}

/* ---------- data ---------- */
const services = [
  { icon: Globe, title: "WordPress Development", desc: "Professional, responsive WordPress websites designed around your brand and goals.",
    items: ["Elementor Pro websites", "Business & corporate sites", "Landing pages", "WooCommerce stores"] },
  { icon: LifeBuoy, title: "WordPress Error Fixing", desc: "Diagnose and resolve WordPress bugs, conflicts, crashes and technical issues.",
    items: ["Critical & fatal errors", "500 / 404 / database errors", "Plugin & theme conflicts", "PHP, server & memory issues"] },
  { icon: Search, title: "SEO Optimization", desc: "Technical and on-page improvements that make websites easier to crawl, understand and rank.",
    items: ["Technical SEO audits", "On-page optimization", "Off-page SEO", "Speed & performance"] },
  { icon: Users, title: "B2B Lead Generation", desc: "Targeted prospect research and verified business data for focused outreach.",
    items: ["Decision-maker research", "Verified email research", "LinkedIn lead research", "Data cleaning & organization"] },
];

const skillGroups = [
  { title: "WordPress", skills: [
    { name: "WordPress", value: 95 }, { name: "Elementor Pro", value: 96 },
    { name: "WooCommerce", value: 91 }, { name: "Bug Fixing", value: 94 },
  ]},
  { title: "SEO", skills: [
    { name: "On-Page SEO", value: 92 }, { name: "Technical SEO", value: 88 },
    { name: "Off-Page SEO", value: 85 }, { name: "Speed Optimization", value: 90 },
  ]},
  { title: "Lead Generation", skills: [
    { name: "B2B Research", value: 94 }, { name: "Email Research", value: 92 },
    { name: "LinkedIn Research", value: 90 }, { name: "Data Cleaning", value: 93 },
  ]},
  { title: "Web & Tools", skills: [
    { name: "HTML / CSS", value: 97 }, { name: "JavaScript", value: 92 },
    { name: "Git / GitHub", value: 92 }, { name: "Figma", value: 88 },
  ]},
];

const projects = [
  { img: p1, cat: "WordPress", title: "Business Website", desc: "Responsive Elementor-powered website with clean sections, conversion-focused layout and easy content management.", tech: ["WordPress", "Elementor", "Responsive"] },
  { img: p2, cat: "WordPress Debugging", title: "Error & Bug Fixing", desc: "Technical troubleshooting for plugin conflicts, fatal errors, broken layouts, database and server-related issues.", tech: ["WordPress", "PHP", "Debugging"] },
  { img: p3, cat: "SEO", title: "Website Optimization", desc: "Technical, on-page and performance improvements designed to strengthen search visibility and user experience.", tech: ["SEO", "Technical", "Performance"] },
  { img: p4, cat: "Lead Generation", title: "B2B Prospect List", desc: "Targeted decision-maker research with relevant business data, email research and organized delivery.", tech: ["B2B Research", "Email Research", "LinkedIn"] },
  { img: p5, cat: "WooCommerce", title: "Online Store", desc: "Responsive product pages, shopping flow and WordPress customization for an easy-to-manage store.", tech: ["WooCommerce", "WordPress", "Elementor"] },
  { img: p6, cat: "SEO + WordPress", title: "Website Revamp", desc: "Combined design, technical cleanup, performance improvements and SEO-friendly structure.", tech: ["SEO", "WordPress", "Performance"] },
];

const whyItems = [
  { icon: Sparkles, title: "Clean & Professional", text: "Structured work with attention to detail." },
  { icon: Smartphone, title: "Responsive", text: "Layouts tested across desktop, tablet and mobile." },
  { icon: Search, title: "SEO Friendly", text: "Performance and search visibility considered from the start." },
  { icon: Mail, title: "Clear Communication", text: "Simple updates and dependable project handling." },
  { icon: Briefcase, title: "4+ Years Experience", text: "Practical experience across web and digital services." },
  { icon: Users, title: "Client Focused", text: "Solutions built around your actual requirements." },
  { icon: ShieldCheck, title: "Attention to Detail", text: "Careful research, testing and quality checks." },
  { icon: LifeBuoy, title: "Long-Term Support", text: "Help with improvements and future updates." },
];

const testimonials = [
  { name: "adnanaadnan", flag: "🇺🇸", country: "United States",
    text: "Great lead generation work! The leads were accurate, well-researched, and delivered exactly as requested. Excellent communication and fast delivery. Highly recommended" },
  { name: "joins42", flag: "🇺🇸", country: "United States",
    text: "Very happy with the overall experience. The work was accurate, well-organized, and delivered on time. Definitely recommend" },
  { name: "aline232", flag: "🇬🇧", country: "United Kingdom",
    text: "Excellent freelancer! Reliable, accurate, and delivered everything perfectly." },
  { name: "jamesli09", flag: "🇺🇸", country: "United States",
    text: "Delivered exactly what I needed. The research was detailed and well organized." },
  { name: "henymorck", flag: "🇺🇸", country: "United States",
    text: "Excellent work and very professional service. Great communication and delivered exactly as expected. Highly recommended" },
  { name: "metno23", flag: "🇩🇪", country: "Germany",
    text: "The leads were accurate, relevant, and well-researched. The data was organized perfectly and delivered on time. Great communication and excellent work overall." },
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
    ["Work", "portfolio"], ["Reviews", "testimonials"], ["Contact", "contact"],
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
            Build. Fix. <span className="text-gradient">Optimize.</span> Grow.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="mt-5 max-w-xl text-sm font-medium tracking-wide text-primary/90">
            WordPress Developer · SEO Specialist · B2B Lead Generation Expert
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
            className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            I'm Zain Ul Abdeen — helping businesses build reliable websites, solve technical issues, improve visibility and generate quality leads.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary/70 text-primary-foreground glow-blue hover:opacity-95">
              <a href="#contact">Let's Work Together <ArrowRight className="ml-1 h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5 hover:bg-white/10">
              <a href="#portfolio">View My Work</a>
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
                <Avatar name="adnanaadnan" className="grid h-7 w-7 place-items-center rounded-full border-2 border-background" />
                <Avatar name="henymorck" className="grid h-7 w-7 place-items-center rounded-full border-2 border-background" />
                <Avatar name="metno23" className="grid h-7 w-7 place-items-center rounded-full border-2 border-background" />
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
    <Section id="about" eyebrow="About Me" title="Digital solutions built around business results"
      subtitle="Clean execution, reliable communication and measurable outcomes.">
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
              <div className="text-sm text-muted-foreground">WordPress · SEO · Lead Generation</div>
            </div>
          </div>
          <p className="text-lg leading-relaxed text-foreground/90">
            I'm <span className="font-semibold text-foreground">Zain Ul Abdeen</span> — over the last 4+ years, I've worked on
            websites, SEO campaigns and lead-generation projects with a focus on clean execution, reliable communication
            and measurable outcomes.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            My core work is now centered on four services:
            <span className="text-primary font-medium"> WordPress Development</span>,
            <span className="text-primary font-medium"> WordPress Error Fixing</span>,
            <span className="text-primary font-medium"> SEO Optimization</span> and
            <span className="text-primary font-medium"> B2B Lead Generation</span>.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["WordPress", "Elementor Pro", "WooCommerce", "SEO", "B2B Leads", "Data Research"].map(t => (
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
    <Section id="services" eyebrow="What I Do" title="Four services. One reliable partner."
      subtitle="From building a website to fixing critical errors, improving search visibility and supplying targeted B2B data.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
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
    <Section id="skills" eyebrow="Skills" title="Tools and expertise I use daily"
      subtitle="The stack behind reliable websites, better rankings and quality leads.">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
    <Section id="portfolio" eyebrow="Selected Work" title="Projects aligned with my services"
      subtitle="WordPress builds, error fixing, SEO optimization and B2B lead generation.">
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
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{p.cat}</span>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tech.map(t => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted-foreground">{t}</span>
                ))}
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
