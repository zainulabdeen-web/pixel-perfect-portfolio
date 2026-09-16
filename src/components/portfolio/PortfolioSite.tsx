import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Check,
  Code2,
  Gauge,
  Github,
  Globe,
  Layout,
  LifeBuoy,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Palette,
  Search,
  Send,
  Server,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type ComponentType, type FormEvent } from "react";
import { toast } from "sonner";

import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import profileAsset from "@/assets/zain-profile.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const CONTACT_EMAIL = "zaingill77665@gmail.com";
export const PROFESSIONAL_TITLE = "WordPress & WooCommerce Developer | Full Stack Web Developer";
export const LINKEDIN_URL = "https://www.linkedin.com/in/zain-ul-abdeen-0853b539b";
export const FIVERR_URL = "https://www.fiverr.com/s/R7L34w8";
const profile = profileAsset.url;

type IconType = ComponentType<{ className?: string }>;
type RoutePath = "/" | "/about" | "/services" | "/skills" | "/work" | "/contact";

export const services = [
  { icon: Globe, title: "WordPress Development", description: "Professional WordPress websites, redesigns, custom functionality, and dependable ongoing maintenance.", features: ["Business websites", "Custom layouts", "Ongoing support"] },
  { icon: ShoppingCart, title: "WooCommerce Development", description: "Fast, user-friendly online stores with polished product, cart, checkout, and payment experiences.", features: ["Store setup", "Checkout customization", "Payment integration"] },
  { icon: Layout, title: "Elementor Website Development", description: "Responsive Elementor websites, custom sections, redesigns, and focused landing pages.", features: ["Responsive pages", "Custom sections", "Landing pages"] },
  { icon: Wrench, title: "WordPress Error Fixing & Troubleshooting", description: "Careful diagnosis and repair of critical errors, conflicts, broken layouts, and access issues.", features: ["Critical errors", "Plugin conflicts", "Layout repairs"] },
  { icon: Code2, title: "WordPress Bug Fixing & Debugging", description: "Root-cause debugging for theme, plugin, PHP, database, and custom-code problems.", features: ["PHP debugging", "Theme fixes", "Database issues"] },
  { icon: Search, title: "SEO & Website Optimization", description: "Search-friendly structure, technical improvements, on-page SEO, and practical website optimization.", features: ["On-page SEO", "Technical SEO", "Search Console"] },
  { icon: Gauge, title: "Website Speed & Performance Optimization", description: "Performance improvements focused on loading speed, Core Web Vitals, assets, and usability.", features: ["Core Web Vitals", "Asset optimization", "Performance audits"] },
  { icon: Server, title: "Front-End / Full Stack Web Development", description: "Responsive interfaces and maintainable custom functionality across modern front-end and backend stacks.", features: ["Responsive UI", "REST APIs", "Custom development"] },
];

export const skillGroups = [
  { title: "WordPress", icon: Globe, skills: ["WordPress", "WooCommerce", "Elementor", "WordPress Customization", "WordPress Troubleshooting", "WordPress Bug Fixing", "Theme & Plugin Debugging"] },
  { title: "Front-End Development", icon: Palette, skills: ["HTML5", "CSS3", "JavaScript", "React JS", "Responsive Web Design"] },
  { title: "Backend / Development", icon: Server, skills: ["PHP", "REST APIs", "Database Integration", "Custom WordPress Development"] },
  { title: "SEO", icon: Search, skills: ["On-Page SEO", "Technical SEO", "Off-Page SEO", "Website Optimization", "Speed Optimization"] },
  { title: "Tools", icon: Wrench, skills: ["Git", "GitHub", "VS Code", "Figma", "Canva", "Google Search Console"] },
];

export const projects = [
  { img: p1, title: "WordPress Business Website", desc: "A responsive business website with Elementor customization and a clean, practical user experience.", tech: ["WordPress", "Elementor", "PHP"], category: "WordPress" },
  { img: p2, title: "WooCommerce Online Store", desc: "A modern store concept with product customization and an optimized shopping experience.", tech: ["WooCommerce", "WordPress", "Elementor"], category: "WooCommerce" },
  { img: p3, title: "WordPress Troubleshooting", desc: "Technical troubleshooting covering plugin conflicts, broken layouts, errors, and functionality issues.", tech: ["WordPress", "PHP", "Debugging"], category: "Web Development" },
  { img: p4, title: "SEO & Website Optimization", desc: "Technical and on-page improvements focused on structure, performance, usability, and search visibility.", tech: ["SEO", "WordPress", "Performance"], category: "SEO" },
  { img: p5, title: "Elementor Landing Page", desc: "A responsive, conversion-focused landing page designed and developed with Elementor.", tech: ["Elementor", "WordPress", "CSS"], category: "Frontend" },
  { img: p6, title: "WordPress Speed Optimization", desc: "Loading-speed, Core Web Vitals, and asset improvements for a faster WordPress experience.", tech: ["WordPress", "Performance", "SEO"], category: "WordPress" },
];

export const whyItems = [
  { icon: Code2, title: "Clean Development", text: "Maintainable, organized, and practical solutions built around your requirements." },
  { icon: Smartphone, title: "Responsive Design", text: "Professional websites that work smoothly across desktop, tablet, and mobile." },
  { icon: Wrench, title: "Problem Solving", text: "I find the actual cause of technical issues instead of applying temporary fixes." },
  { icon: Gauge, title: "Performance Focused", text: "Every website is built and optimized with speed, usability, and performance in mind." },
  { icon: Search, title: "SEO Friendly", text: "Clean structure and search-friendly implementation support stronger visibility." },
  { icon: LifeBuoy, title: "Client Focused", text: "Clear communication, attention to detail, and reliable support throughout the project." },
];

export const experience = [
  { year: "2022 — Present", title: "Senior WordPress Developer", text: "Developing, customizing, troubleshooting, and optimizing WordPress and WooCommerce websites with Elementor, PHP, HTML, CSS, and JavaScript." },
  { year: "2021 — Present", title: "Full Stack Web Developer", text: "Building responsive interfaces and custom functionality with a focus on usability, performance, and maintainable development." },
  { year: "2020 — Present", title: "Freelance Web Developer", text: "Supporting businesses with WordPress development, WooCommerce stores, redesigns, bug fixing, SEO, performance, and ongoing maintenance." },
];

const navItems: { label: string; to: RoutePath }[] = [
  { label: "Home", to: "/" }, { label: "About", to: "/about" }, { label: "Services", to: "/services" },
  { label: "Skills", to: "/skills" }, { label: "Work", to: "/work" }, { label: "Contact", to: "/contact" },
];

const fadeUp = { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-70px" }, transition: { duration: 0.55 } };

function FiverrIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true"><path d="M18.3 10.6h-2.4v-.6c0-.7.5-1 1.2-1h1V6.4h-1.4c-2.4 0-3.9 1.3-3.9 3.6v.6H9.5v-.6c0-.7.5-1 1.2-1h.9V6.4h-1.3c-2.4 0-3.9 1.3-3.9 3.6v.6H4.8v2.6h1.6v5.4h3.1v-5.4h3.3v5.4h3.1v-5.4h2.4v-2.6zM17.3 5.6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /></svg>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll(); window.addEventListener("scroll", onScroll); return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  return <header className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-3" : "py-5"}`}>
    <div className="mx-auto max-w-7xl px-4 sm:px-6"><div className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${scrolled ? "glass-strong" : ""}`}>
      <Link to="/" className="flex min-w-0 items-center gap-2 font-display text-base font-bold sm:text-lg"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">Z</span><span className="truncate">Zain Ul Abdeen<span className="text-secondary">.</span></span></Link>
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">{navItems.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="relative py-2 text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-secondary" }}>{item.label}</Link>)}</nav>
      <Button asChild className="hidden rounded-full bg-gradient-to-r from-primary to-primary/70 glow-blue lg:inline-flex"><Link to="/contact">Hire Me <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
      <Button type="button" variant="ghost" size="icon" onClick={() => setOpen((value) => !value)} className="lg:hidden" aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</Button>
    </div>
    <AnimatePresence>{open && <motion.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-2 flex flex-col gap-1 rounded-2xl glass-strong p-4 lg:hidden" aria-label="Mobile navigation">{navItems.map((item) => <Link key={item.to} to={item.to} activeOptions={{ exact: item.to === "/" }} className="rounded-lg px-3 py-3 text-sm text-muted-foreground" activeProps={{ className: "bg-primary/10 text-primary" }}>{item.label}</Link>)}<Button asChild className="mt-2 rounded-full bg-gradient-to-r from-primary to-primary/70"><Link to="/contact">Hire Me</Link></Button></motion.nav>}</AnimatePresence>
    </div>
  </header>;
}

export function Footer() {
  return <footer className="border-t border-white/5 py-14"><div className="mx-auto grid max-w-7xl gap-10 px-6 md:grid-cols-2 lg:grid-cols-4">
    <div><Link to="/" className="flex items-center gap-2 font-display text-lg font-bold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-primary-foreground">Z</span>Zain Ul Abdeen</Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{PROFESSIONAL_TITLE}</p></div>
    <FooterLinks title="Quick Links" links={navItems.map((item) => ({ label: item.label, to: item.to }))} />
    <FooterLinks title="Services" links={["WordPress Development", "WooCommerce", "Elementor", "Bug Fixing", "SEO", "Speed Optimization"].map((label) => ({ label, to: "/services" as RoutePath }))} />
    <div><h2 className="text-sm font-semibold">Contact</h2><a href={`mailto:${CONTACT_EMAIL}`} className="mt-4 flex items-center gap-2 break-all text-sm text-muted-foreground hover:text-primary"><Mail className="h-4 w-4 shrink-0" />{CONTACT_EMAIL}</a><div className="mt-4 flex gap-2"><SocialLink href={LINKEDIN_URL} label="LinkedIn" icon={Linkedin} /><SocialLink href={FIVERR_URL} label="Fiverr" icon={FiverrIcon} /><SocialLink href={`mailto:${CONTACT_EMAIL}`} label="Email" icon={Mail} external={false} /></div></div>
  </div><div className="mx-auto mt-10 max-w-7xl border-t border-white/5 px-6 pt-6 text-sm text-muted-foreground">© 2026 Zain Ul Abdeen. All rights reserved.</div></footer>;
}

function FooterLinks({ title, links }: { title: string; links: { label: string; to: RoutePath }[] }) {
  return <div><h2 className="text-sm font-semibold">{title}</h2><ul className="mt-4 space-y-2">{links.map((link) => <li key={link.label}><Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-primary">{link.label}</Link></li>)}</ul></div>;
}

function SocialLink({ href, label, icon: Icon, external = true }: { href: string; label: string; icon: IconType; external?: boolean }) {
  return <a href={href} aria-label={label} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-primary/40 hover:text-primary"><Icon className="h-4 w-4" /></a>;
}

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  return <div className="min-h-screen overflow-x-hidden"><Navbar /><AnimatePresence mode="wait"><motion.main key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>{children}</motion.main></AnimatePresence><Footer /></div>;
}

export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="relative overflow-hidden pb-16 pt-40 md:pb-20 md:pt-48"><div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} /><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="relative mx-auto max-w-4xl px-6 text-center"><span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase text-primary"><Sparkles className="h-3 w-3" />{eyebrow}</span><h1 className="mt-5 text-4xl font-bold sm:text-5xl md:text-6xl">{title}</h1><p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p></motion.div></section>;
}

export function SectionHeading({ eyebrow, title, description, align = "center" }: { eyebrow?: string; title: string; description?: string; align?: "left" | "center" }) {
  return <motion.div {...fadeUp} className={`mb-12 max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>{eyebrow && <span className="text-xs font-semibold uppercase text-primary">{eyebrow}</span>}<h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>{description && <p className="mt-4 leading-relaxed text-muted-foreground">{description}</p>}</motion.div>;
}

export function ServiceCard({ service, compact = false }: { service: (typeof services)[number]; compact?: boolean }) {
  const Icon = service.icon;
  return <motion.article {...fadeUp} whileHover={{ y: -5 }} className="group rounded-3xl glass p-7 transition-colors hover:border-primary/40"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/20 text-primary"><Icon className="h-6 w-6" /></div><h3 className="mt-5 text-xl font-semibold">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>{!compact && <><ul className="mt-5 space-y-2">{service.features.map((feature) => <li key={feature} className="flex items-center gap-2 text-sm text-foreground/85"><Check className="h-4 w-4 text-secondary" />{feature}</li>)}</ul><Button asChild variant="ghost" className="mt-5 px-0 text-primary hover:bg-transparent"><Link to="/contact">Discuss this service <ArrowRight className="ml-1 h-4 w-4" /></Link></Button></>}</motion.article>;
}

export function SkillCard({ group }: { group: (typeof skillGroups)[number] }) {
  const Icon = group.icon;
  return <motion.article {...fadeUp} className="rounded-3xl glass p-7"><div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary"><Icon className="h-5 w-5" /></span><h2 className="text-xl font-semibold">{group.title}</h2></div><div className="mt-6 flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground/85">{skill}</span>)}</div></motion.article>;
}

export function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  return <motion.article {...fadeUp} whileHover={{ y: -5 }} className="group overflow-hidden rounded-3xl glass"><div className="overflow-hidden"><img src={project.img} alt={project.title} width={1024} height={640} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></div><div className="p-6"><span className="text-xs font-semibold uppercase text-primary">{project.category}</span><h2 className="mt-2 text-xl font-semibold">{project.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.desc}</p><div className="mt-4 flex flex-wrap gap-2">{project.tech.map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted-foreground">{item}</span>)}</div></div></motion.article>;
}

export function CTASection({ title = "Let's build something great.", text = "Tell me about your project, website issue, or idea — I'll get back to you." }: { title?: string; text?: string }) {
  return <section className="px-6 py-20"><motion.div {...fadeUp} className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl glass-strong px-6 py-14 text-center md:px-12"><div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "var(--gradient-hero)" }} /><div className="relative"><h2 className="text-3xl font-bold sm:text-4xl">{title}</h2><p className="mx-auto mt-4 max-w-xl text-muted-foreground">{text}</p><Button asChild size="lg" className="mt-7 rounded-full bg-gradient-to-r from-primary to-primary/70 glow-blue"><Link to="/contact">Start a conversation <ArrowRight className="ml-1 h-4 w-4" /></Link></Button></div></motion.div></section>;
}

export function Stats() {
  return <section className="px-6 py-16"><div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4">{[{ value: "4+", label: "Years Experience" }, { value: "100+", label: "Projects" }, { value: "50+", label: "Clients" }, { value: "20+", label: "Countries" }].map((stat) => <motion.div {...fadeUp} key={stat.label} className="rounded-2xl glass p-6 text-center"><div className="text-3xl font-bold text-gradient sm:text-4xl">{stat.value}</div><div className="mt-2 text-xs uppercase text-muted-foreground">{stat.label}</div></motion.div>)}</div></section>;
}

export function Hero() {
  return <section className="relative flex min-h-[92vh] items-center overflow-hidden pb-16 pt-32"><div className="pointer-events-none absolute inset-0" style={{ background: "var(--gradient-hero)" }} /><div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2"><motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}><span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"><span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />Available for freelance projects</span><h1 className="mt-6 text-5xl font-bold leading-[1.08] sm:text-6xl lg:text-7xl">Hi, I'm <span className="text-gradient">Zain Ul Abdeen</span></h1><p className="mt-5 max-w-xl text-2xl font-semibold text-foreground/90 sm:text-3xl">WordPress &amp; WooCommerce Developer <span className="block text-muted-foreground">| Full Stack Web Developer</span></p><p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">I build, fix, customize, and optimize professional WordPress websites and WooCommerce stores that are responsive, SEO-friendly, fast, secure, and easy to manage.</p><div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-primary/70 glow-blue"><Link to="/contact">Hire Me <ArrowRight className="ml-1 h-4 w-4" /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-full border-white/20 bg-white/5"><Link to="/work">View Work</Link></Button></div><div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground"><span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-primary" />100+ projects delivered</span><span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-secondary" />Remote · Worldwide</span></div></motion.div><motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .7 }} className="relative mx-auto w-full max-w-md"><div className="absolute -inset-6 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 blur-2xl" /><img src={profile} alt="Zain Ul Abdeen, WordPress and WooCommerce developer" width={800} height={800} loading="eager" className="relative aspect-square w-full rounded-full border-4 border-white/10 object-cover ring-4 ring-primary/20" /></motion.div></div></section>;
}

export function HomePage() {
  return <><Hero /><Stats /><section className="py-20"><div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[.85fr_1.15fr]"><motion.img {...fadeUp} src={profile} alt="Zain Ul Abdeen" width={640} height={640} loading="lazy" className="mx-auto aspect-square w-full max-w-sm rounded-3xl object-cover glass p-2" /><motion.div {...fadeUp}><span className="text-xs font-semibold uppercase text-primary">About Me</span><h2 className="mt-3 text-3xl font-bold sm:text-4xl">Building websites that work as good as they look.</h2><p className="mt-5 leading-relaxed text-muted-foreground">I'm a WordPress and full-stack web developer with 4+ years of experience building, fixing, customizing, and optimizing websites for businesses and online stores.</p><Button asChild variant="outline" className="mt-6 rounded-full border-white/15 bg-white/5"><Link to="/about">Read More <ArrowRight className="ml-1 h-4 w-4" /></Link></Button></motion.div></div></section><section className="py-20"><div className="mx-auto max-w-7xl px-6"><SectionHeading eyebrow="Services" title="Focused digital solutions" description="Specialist WordPress services for reliable, fast, and search-friendly websites." /><div className="grid gap-6 md:grid-cols-3">{services.slice(0, 3).map((service) => <ServiceCard key={service.title} service={service} compact />)}</div><div className="mt-8 text-center"><Button asChild variant="outline" className="rounded-full border-white/15 bg-white/5"><Link to="/services">View Services <ArrowRight className="ml-1 h-4 w-4" /></Link></Button></div></div></section><section className="py-20"><div className="mx-auto max-w-7xl px-6"><SectionHeading eyebrow="Selected Work" title="Recent project highlights" /><div className="grid gap-8 md:grid-cols-3">{projects.slice(0, 3).map((project) => <ProjectCard key={project.title} project={project} />)}</div><div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild variant="outline" className="rounded-full border-white/15 bg-white/5"><Link to="/work">View All Work</Link></Button><Button asChild variant="ghost" className="rounded-full"><Link to="/skills">View Skills <ArrowRight className="ml-1 h-4 w-4" /></Link></Button></div></div></section><section className="py-20"><div className="mx-auto max-w-7xl px-6"><SectionHeading eyebrow="Why Choose Me" title="Reliable from brief to launch" /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{whyItems.slice(0, 3).map((item) => <WhyCard key={item.title} item={item} />)}</div></div></section><CTASection /></>;
}

export function WhyCard({ item }: { item: (typeof whyItems)[number] }) { const Icon = item.icon; return <motion.article {...fadeUp} className="rounded-2xl glass p-6"><span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary/15 text-secondary"><Icon className="h-5 w-5" /></span><h3 className="mt-4 text-lg font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></motion.article>; }

export function AboutPage() {
  return <><PageHeader eyebrow="About Me" title="Experience built around reliable websites." description="WordPress, WooCommerce, and full-stack development focused on strong experiences and practical results." /><section className="py-16"><div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-[.8fr_1.2fr]"><motion.div {...fadeUp} className="rounded-3xl glass p-3"><img src={profile} alt="Zain Ul Abdeen" width={800} height={800} className="aspect-square w-full rounded-2xl object-cover" /></motion.div><motion.div {...fadeUp} className="rounded-3xl glass p-8"><span className="text-xs font-semibold uppercase text-primary">About Me</span><h2 className="mt-3 text-3xl font-bold">{PROFESSIONAL_TITLE}</h2><p className="mt-5 leading-relaxed text-foreground/90">I'm Zain Ul Abdeen, a WordPress and full-stack web developer with 4+ years of experience building, fixing, customizing, and optimizing websites for businesses and online stores.</p><p className="mt-4 leading-relaxed text-muted-foreground">I specialize in WordPress, WooCommerce, Elementor, troubleshooting, SEO, speed, and performance. My work balances clean development, responsive experiences, clear communication, and reliable support.</p></motion.div></div></section><Stats /><section className="py-20"><div className="mx-auto max-w-7xl px-6"><SectionHeading eyebrow="My Experience" title="A practical development journey" /><div className="mx-auto max-w-4xl space-y-5">{experience.map((item) => <motion.article {...fadeUp} key={item.title} className="grid gap-3 rounded-3xl glass p-7 md:grid-cols-[10rem_1fr]"><div className="text-sm font-semibold text-secondary">{item.year}</div><div><h3 className="text-xl font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p></div></motion.article>)}</div></div></section><section className="py-20"><div className="mx-auto max-w-7xl px-6"><SectionHeading eyebrow="What I Do" title="Technical depth, business clarity" /><div className="grid gap-6 md:grid-cols-3">{services.slice(0, 3).map((service) => <ServiceCard key={service.title} service={service} compact />)}</div></div></section><section className="py-20"><div className="mx-auto max-w-7xl px-6"><SectionHeading eyebrow="Why Choose Me" title="A professional approach" description="Clear planning, careful implementation, and dependable communication at every stage." /><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{whyItems.map((item) => <WhyCard key={item.title} item={item} />)}</div></div></section><CTASection /></>;
}

export function ServicesPage() { return <><PageHeader eyebrow="Services" title="WordPress solutions built to perform." description="From a new website to complex troubleshooting, each service is focused on quality, clarity, and long-term value." /><section className="py-16"><div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2">{services.map((service) => <ServiceCard key={service.title} service={service} />)}</div></section><CTASection title="Need a tailored solution?" /></>; }

export function SkillsPage() { return <><PageHeader eyebrow="Skills" title="A focused toolkit for modern websites." description="Specialized WordPress expertise supported by front-end, backend, SEO, and professional workflow tools." /><section className="py-16"><div className="mx-auto grid max-w-7xl gap-6 px-6 md:grid-cols-2 lg:grid-cols-3">{skillGroups.map((group) => <SkillCard key={group.title} group={group} />)}</div></section><CTASection title="Put these skills to work." /></>; }

export function WorkPage() {
  const filters = ["All", "WordPress", "WooCommerce", "Frontend", "SEO", "Web Development"];
  const [active, setActive] = useState("All");
  const visible = useMemo(() => active === "All" ? projects : projects.filter((project) => project.category === active), [active]);
  return <><PageHeader eyebrow="Portfolio" title="Selected work and capabilities." description="A curated view of WordPress, WooCommerce, Elementor, SEO, and performance-focused project work." /><section className="py-16"><div className="mx-auto max-w-7xl px-6"><div className="mb-10 flex flex-wrap justify-center gap-2" aria-label="Filter projects">{filters.map((filter) => <Button key={filter} type="button" size="sm" variant={active === filter ? "default" : "outline"} onClick={() => setActive(filter)} className="rounded-full border-white/15">{filter}</Button>)}</div><motion.div layout className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{visible.map((project) => <ProjectCard key={project.title} project={project} />)}</motion.div></div></section><CTASection /></>;
}

export function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const submit = async (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); if (status === "loading") return; const form = event.currentTarget; const data = new FormData(form); const payload = { name: String(data.get("name") || "").trim(), email: String(data.get("email") || "").trim(), subject: String(data.get("subject") || "").trim(), message: String(data.get("message") || "").trim() }; if (Object.values(payload).some((value) => !value)) { toast.error("Please fill in all fields."); return; } if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) { toast.error("Please enter a valid email address."); return; } setStatus("loading"); try { const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...payload, _subject: `Portfolio Contact: ${payload.subject}`, _template: "table", _captcha: "false" }) }); if (!response.ok) throw new Error("Message request failed"); setStatus("success"); form.reset(); toast.success("Message sent successfully."); } catch { setStatus("error"); toast.error("Please email me directly."); } };
  return <><PageHeader eyebrow="Contact" title="Let's Build Something Great" description="Tell me about your project and I'll get back to you." /><section className="pb-24 pt-8"><div className="mx-auto grid max-w-6xl gap-8 px-6 lg:grid-cols-5"><motion.aside {...fadeUp} className="rounded-3xl glass p-8 lg:col-span-2"><img src={profile} alt="Zain Ul Abdeen" width={128} height={128} className="h-28 w-28 rounded-full object-cover ring-2 ring-primary/30" /><h2 className="mt-6 text-2xl font-semibold">Start a conversation</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Available for freelance projects and long-term partnerships.</p><div className="mt-7 space-y-4 text-sm"><a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-3 break-all hover:text-primary"><Mail className="h-4 w-4 text-primary" />{CONTACT_EMAIL}</a><div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" />Remote · Worldwide</div></div><div className="mt-7 flex gap-2"><SocialLink href={LINKEDIN_URL} label="LinkedIn" icon={Linkedin} /><SocialLink href={FIVERR_URL} label="Fiverr" icon={FiverrIcon} /><SocialLink href={`mailto:${CONTACT_EMAIL}`} label="Email" icon={Mail} external={false} /></div></motion.aside><motion.form {...fadeUp} onSubmit={submit} noValidate className="rounded-3xl glass p-8 lg:col-span-3"><div className="grid gap-4 sm:grid-cols-2"><Field id="name" label="Name"><Input id="name" name="name" required maxLength={100} placeholder="Your name" className="mt-1 border-white/10 bg-white/5" /></Field><Field id="email" label="Email"><Input id="email" name="email" type="email" required maxLength={255} placeholder="you@company.com" className="mt-1 border-white/10 bg-white/5" /></Field></div><div className="mt-4"><Field id="subject" label="Subject"><Input id="subject" name="subject" required maxLength={160} placeholder="What's this about?" className="mt-1 border-white/10 bg-white/5" /></Field></div><div className="mt-4"><Field id="message" label="Message"><Textarea id="message" name="message" required maxLength={2000} rows={7} placeholder="Tell me about your project…" className="mt-1 border-white/10 bg-white/5" /></Field></div><Button type="submit" size="lg" disabled={status === "loading"} className="mt-6 w-full rounded-full bg-gradient-to-r from-primary to-primary/70 glow-blue">{status === "loading" ? "Sending…" : <>Send Message <Send className="ml-1 h-4 w-4" /></>}</Button>{status === "success" && <p className="mt-3 text-center text-sm text-green-400">Thanks! Your message has been sent.</p>}{status === "error" && <p className="mt-3 text-center text-sm text-red-400">Something went wrong. Email me at {CONTACT_EMAIL}.</p>}</motion.form></div></section></>;
}

function Field({ id, label, children }: { id: string; label: string; children: React.ReactNode }) { return <div><label htmlFor={id} className="text-xs text-muted-foreground">{label}</label>{children}</div>; }
