import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CaretDown,
  Users,
  Trophy,
  Medal,
  Barbell,
  Backpack,
  BookOpen,
  Flag,
  ShieldCheck,
  ArrowUpRight,
} from "@phosphor-icons/react";
import ImpactStats from "@/components/sections/ImpactStats";
import ProgramCard from "@/components/sections/ProgramCard";
import StudentProfile from "@/components/sections/StudentProfile";
import { BentoGridGalleryDemo } from "@/components/ui/demo";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const programs = [
  {
    sport: "Field Hockey",
    description:
      "Our flagship program — structured coaching, equipment support, and a proven pathway to national competition.",
    status: "active" as const,
    accentColor: "#f5a623",
    imageUrl:
      "https://lh3.googleusercontent.com/pw/AP1GczMy6EX2KZVl7UQnppYqMwJp-wWVoMjkuPgMqqb3KKY-8jxl-E8h6N_9VAXu7tTtlV50Vbxscvulq4o9gXFlToRcg6GbGQl2NNJASrSumEOe29ZLMH8ENngHlqiUS1pXr7fOvCvwf5L9E7bm4vCCbStt=w1376-h917-s-no-gm?authuser=0",
  },
  {
    sport: "Football",
    description:
      "Systematic identification and training pipeline for gifted youth footballers across Thane District.",
    status: "expanding" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=640&q=80&auto=format&fit=crop",
  },
  {
    sport: "Athletics",
    description:
      "Track & field development program nurturing sprinters, jumpers, and middle-distance runners.",
    status: "expanding" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=640&q=80&auto=format&fit=crop",
  },
  {
    sport: "Cricket",
    description:
      "Structured batting, bowling, and fielding programs with competitive league exposure.",
    status: "expanding" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=640&q=80&auto=format&fit=crop",
  },
  {
    sport: "Kabaddi",
    description:
      "Reviving the roots of Indian sport — disciplined training and regional tournament participation.",
    status: "expanding" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=640&q=80&auto=format&fit=crop",
  },
  {
    sport: "Badminton",
    description:
      "Court-based program with technical skill development and inter-district tournament exposure.",
    status: "expanding" as const,
    imageUrl:
      "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=640&q=80&auto=format&fit=crop",
  },
];

const testimonials = [
  {
    quote:
      "PCube didn't just teach me hockey. They taught me discipline and gave me a future.",
    author: "Arjun P.",
    role: "National Level Hockey Player",
  },
  {
    quote:
      "These children train like professionals. PCube's discipline and care changed not just their games — but their futures.",
    author: "Coach Priya S.",
    role: "Head Coach, Field Hockey",
  },
  {
    quote:
      "My son came home with a national selection letter. I didn't believe it was real.",
    author: "Meena K.",
    role: "Parent",
  },
];

const impactHighlights = [
  {
    label: "Athletes Trained",
    value: "120+",
    icon: Users,
  },
  {
    label: "State Selections",
    value: "15",
    icon: Trophy,
  },
  {
    label: "National Players",
    value: "02",
    icon: Medal,
  },
];

const whyPcube = [
  {
    title: "Structured Training",
    description:
      "Age-wise, skill-specific coaching plans designed for sustainable performance growth.",
    icon: Barbell,
  },
  {
    title: "Nutrition & Kit Support",
    description:
      "From sticks and shoes to recovery and nutrition guidance, we remove access barriers.",
    icon: Backpack,
  },
  {
    title: "Academic Mentoring",
    description:
      "We help athletes balance school and sport with mentoring and discipline systems.",
    icon: BookOpen,
  },
  {
    title: "Competition Exposure",
    description:
      "Players progress from local grounds to district, state, and national tournament pathways.",
    icon: Flag,
  },
];

const photoStrip = [
  {
    url: "https://lh3.googleusercontent.com/pw/AP1GczMrKHHu7zvAclrA0-REjQVaDunGh1dDwGiaJhKulmSMGTovigEEclrPPLdjORuHdXZUzmA18Er80PS-9t91Wx63tfhFFTh_wsz-q5DIXlct4k2Ks65jVa6OLnhmaL1PrTGEufeve0EozZ1Lvr6ZVGzI=w1376-h917-s-no-gm?authuser=0",
    caption: "Group photo · School 9-a-side hockey league",
  },
  {
    url: "https://lh3.googleusercontent.com/pw/AP1GczNI_LpLp7RoNPSZTmpeDOaanEkfHrXBwqaeKOktToNyigSTUmnhLEoRcPKGsxCZMuIGik0xeQ1ix4ZTdFKTlhlFQUvoPOpRCYGfs57I3hMV_r6wXw17sC7rmxF3wM4k0DCGGDnPUH7duQ-ExynDI75i=w1376-h917-s-no-gm?authuser=0",
    caption: "Coach awards distribution",
  },
  {
    url: "https://lh3.googleusercontent.com/pw/AP1GczPktW81ud2Fmkq9Ujw4ZEhdYSi00hyKYsovmM0aeeqq-spfJhVJBiMi7dgp1bqQQ1lLNmR9jpfiOAvX49Flon5g15MHhBVW4Rbm5ZF5dn55mhtEGSloYRZ6Rnt-G6vuwGJWHxOa7MRJOeXsCWMBI-uq=w1376-h917-s-no-gm?authuser=0",
    caption: "Junior kit distribution",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    document.title =
      "PCube Foundation – Empowering India's Future Athletes (Sports NGO)";

    let descriptionMeta = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    if (!descriptionMeta) {
      descriptionMeta = document.createElement("meta");
      descriptionMeta.name = "description";
      document.head.appendChild(descriptionMeta);
    }
    descriptionMeta.content =
      "PCube Foundation empowers rural youth through hockey and sports training. Bridging talented athletes to national success – learn how to join or support our mission.";
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    let frame: number;
    const animate = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [prefersReduced]);

  return (
    <main className="bg-[hsl(var(--background))] selection:bg-[hsl(var(--primary))] selection:text-[hsl(var(--primary-foreground))]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[hsl(var(--primary))] focus:text-[hsl(var(--primary-foreground))] rounded-full"
      >
        Skip to content
      </a>

      {/* ========= HERO SECTION — ASYMMETRIC EDITORIAL ========= */}
      <section
        id="main-content"
        aria-label="Hero"
        className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden py-24"
      >
        {/* Background Textures */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            ref={heroRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_30%_40%,_var(--color-primary)_0%,_transparent_60%)] opacity-[0.04] blur-3xl"
          />
          <div className="absolute inset-0 noise-overlay" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            >
              {/* <div className="inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
                <span className="font-display text-[10px] tracking-[0.3em] text-[hsl(var(--muted-foreground))] uppercase">
                  Thane District · Maharashtra · India
                </span>
              </div> */}

              <h1 className="font-display text-[clamp(3rem,11vw,8.5rem)] leading-[0.85] tracking-tighter text-[hsl(var(--foreground))] mb-8">
                FROM VILLAGE <br />
                <span className="inline-block relative">
                  GROUNDS
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 1,
                      duration: 1.5,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="absolute -bottom-2 left-0 w-full h-1 bg-[hsl(var(--primary))] origin-left"
                  />
                </span>
                <br />
                TO{" "}
                <span className="font-editorial italic text-[hsl(var(--primary))] font-normal tracking-tight">
                  National
                </span>
                <br />
                ARENAS.
              </h1>

              <p className="text-[hsl(var(--muted-foreground))] text-lg md:text-xl leading-relaxed max-w-xl mb-12">
                At PCube Foundation, we discover and train underprivileged youth
                in India's towns and villages. Through expert coaching, equipment
                support, and competition pathways, we create future sports
                champions. <span className="text-[hsl(var(--foreground))] font-medium">Prospect. Progress. Play.</span>
              </p>

              <div className="flex flex-wrap gap-5 items-center">
                <Link href="/donate">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="group relative px-10 py-5 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-display tracking-[0.15em] uppercase text-sm rounded-full flex items-center gap-3 overflow-hidden shadow-2xl shadow-[hsl(var(--primary))]/20"
                  >
                    <span>Donate Now</span>
                    <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center transition-all group-hover:bg-black/20 group-hover:rotate-45">
                      <ArrowUpRight size={16} weight="bold" />
                    </div>
                  </motion.button>
                </Link>

                <Link href="/get-involved">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-8 py-5 border border-white/10 text-[hsl(var(--foreground))] font-display tracking-[0.15em] uppercase text-sm rounded-full hover:bg-white/5 transition-all"
                  >
                    Apply as Athlete
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Asymmetric Image Column — REAL PCube photos */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{
                delay: 0.4,
                duration: 1.2,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl z-20 border border-white/10"
            >
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczMrKHHu7zvAclrA0-REjQVaDunGh1dDwGiaJhKulmSMGTovigEEclrPPLdjORuHdXZUzmA18Er80PS-9t91Wx63tfhFFTh_wsz-q5DIXlct4k2Ks65jVa6OLnhmaL1PrTGEufeve0EozZ1Lvr6ZVGzI=w1376-h917-s-no-gm?authuser=0"
                alt="PCube Foundation athletes — school hockey league team photo"
                className="absolute inset-0 w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-display text-[10px] tracking-[0.2em] text-white/70 uppercase">
                  School 9-a-side Hockey League
                </span>
              </div>
            </motion.div>

            {/* Secondary Floating Asset — Double Bezel */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 100 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 1.2,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="absolute -bottom-12 -left-12 w-1/2 aspect-square rounded-[2rem] bg-white/[0.02] backdrop-blur-2xl border border-white/10 p-2 z-30 hidden lg:block"
            >
              <div className="w-full h-full rounded-[calc(2rem-0.5rem)] bg-black/40 overflow-hidden relative">
                <img
                  src="https://lh3.googleusercontent.com/pw/AP1GczN-PXnmyROLJSqHZzlSCAPsXCJ45yOjxVcBDa7FQxkKKAgBHiNxyb4U-Z6BY8IglWXoXgZ9OX8s7G2q7MXRtO8drHPdXpYCm0YjCMLu1QlHMmValvvRAtORET911sv9G0tMvlFa4Tr4FKxH_FNgpe6D=w1376-h917-s-no-gm?authuser=0"
                  className="absolute inset-0 w-full h-full object-cover opacity-70"
                  alt="PCube medal ceremony — young athletes being honoured"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <span className="text-[10px] font-display tracking-[0.2em] text-[hsl(var(--primary))] mb-1 uppercase">
                    Success Story
                  </span>
                  <span className="font-editorial text-xl italic leading-none text-white">
                    Arjun Patil
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Kinetic Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-[hsl(var(--primary))]/20 rounded-tr-[3rem] -mr-8 -mt-8 pointer-events-none" />
          </div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-4"
        >
          <span className="font-display text-[10px] tracking-[0.3em] text-[hsl(var(--muted-foreground))] uppercase">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-[hsl(var(--primary))] to-transparent"
          />
        </motion.div> */}
      </section>

      {/* ========= IMPACT HIGHLIGHTS ========= */}
      <section
        aria-label="Impact highlights"
        className="py-28 lg:py-36 bg-[hsl(var(--background))] relative"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactHighlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.8,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  className="group relative p-8 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20 flex items-center justify-center text-[hsl(var(--primary))] transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <Icon size={24} weight="light" />
                    </div>
                    <div>
                      <p className="font-display text-4xl tracking-tighter text-[hsl(var(--foreground))]">
                        {item.value}
                      </p>
                      <p className="text-xs font-display tracking-[0.2em] text-[hsl(var(--muted-foreground))] uppercase">
                        {item.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========= IMPACT STATS (Animated counters) ========= */}
      <ImpactStats />

      {/* ========= HOW WE HELP ========= */}
      <section
        aria-label="How we help"
        className="py-32 lg:py-48 bg-[hsl(var(--muted))]/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] uppercase border-b border-[hsl(var(--primary))]/30 pb-1">
                Our Methodology
              </span>
              <h2 className="mt-8 font-display text-5xl lg:text-7xl tracking-tighter text-[hsl(var(--foreground))] leading-[0.9]">
                FROM RAW TALENT TO <br />
                <span className="font-editorial italic font-normal text-[hsl(var(--primary))]">
                  Real Opportunity
                </span>
              </h2>
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-[hsl(var(--muted-foreground))] text-lg md:text-xl leading-relaxed">
                PCube identifies raw sporting talent in rural communities and
                provides the training, gear, and exposure these young athletes
                need. Our proven pipeline takes players from local fields to
                district, state and even national levels. By focusing first on
                hockey — India's game of passion — we're already seeing champions
                in the making.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/get-involved">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="group px-8 py-4 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-display tracking-[0.15em] uppercase text-xs rounded-full flex items-center gap-3 overflow-hidden shadow-xl shadow-[hsl(var(--primary))]/10"
                  >
                    <span>Apply as Athlete</span>
                    <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center transition-all group-hover:bg-black/20 group-hover:rotate-45">
                      <ArrowUpRight size={14} weight="bold" />
                    </div>
                  </motion.button>
                </Link>
                <Link href="/sponsors">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-8 py-4 border border-white/10 text-[hsl(var(--foreground))] font-display tracking-[0.15em] uppercase text-xs rounded-full hover:bg-white/5 transition-all"
                  >
                    Sponsor an Athlete
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========= MANIFESTO ========= */}
      <section
        aria-label="Manifesto"
        className="py-32 lg:py-48 bg-[hsl(var(--primary))] relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0 100 C 20 0, 50 0, 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
            />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1] }}
            className="font-display text-[clamp(2.5rem,7vw,6rem)] leading-[0.85] tracking-tighter text-[hsl(var(--primary-foreground))] max-w-5xl mx-auto mb-10"
          >
            SPORT IS NOT THE REWARD. <br />
            <span className="font-editorial italic font-normal">
              It is the Road.
            </span>
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-[hsl(var(--primary-foreground))]/80 text-lg md:text-xl max-w-2xl mx-auto font-sans leading-relaxed"
          >
            Every child who walks through our gates is a prospect. Every session
            is progress. Every game is play. This is the heart of PCube.
          </motion.p>
        </div>
      </section>

      {/* ========= PHOTO STRIP ========= */}
      <section
        aria-label="Field photos"
        className="py-16 lg:py-20 bg-[hsl(var(--background))]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-10">
          <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] uppercase border-b border-[hsl(var(--primary))]/30 pb-1">
            On the Ground
          </span>
          <h2 className="font-display text-4xl lg:text-5xl tracking-tight text-[hsl(var(--foreground))] mt-6">
            IN THE FIELD
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {photoStrip.map((photo, i) => (
            <motion.div
              key={i}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: i * 0.12,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative aspect-[4/3] overflow-hidden group"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
                <p className="font-display text-sm tracking-wider text-white">
                  {photo.caption.toUpperCase()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========= FEATURED STORY — EDITORIAL SPLIT ========= */}
      <section
        aria-label="Featured athlete story"
        className="py-32 lg:py-48 border-y border-white/5 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="relative aspect-[4/5] lg:aspect-square"
          >
            {/* Double Bezel Outer */}
            <div className="absolute inset-x-0 -bottom-12 -top-12 rounded-[4rem] bg-white/[0.02] border border-white/[0.08] p-3 -rotate-3" />

            <div className="relative h-full w-full rounded-[3.5rem] overflow-hidden border border-white/10 shadow-2xl">
              <img
                src="https://lh3.googleusercontent.com/pw/AP1GczO0Uo1Wq3AZ2P6dhO5jrs8wkh7nq-6xYbcBsNSmwyqf50G842ybIqkbktHlPC2cSCVovSXRB33ilUjOkFdwz9fHJGt6BTZ2skwP0qdPJa9SkiEu46qgEf2xzwHfkxdTz8BApqn-mJ5-SkU1JuZzn-aT=w1376-h917-s-no-gm?authuser=0"
                alt="PCube team — branding and identity highlight"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <p className="absolute bottom-8 left-8 right-8 text-white text-xs font-display tracking-[0.3em] uppercase">
                Featured Story · Athlete Journey
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.32, 0.72, 0, 1],
            }}
          >
            <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] uppercase border-b border-[hsl(var(--primary))]/30 pb-1">
              Champions in the Making
            </span>
            <h2 className="mt-8 font-display text-5xl lg:text-8xl tracking-tighter text-[hsl(var(--foreground))] leading-[0.85] mb-8">
              MEET <br />
              <span className="font-editorial italic font-normal text-[hsl(var(--primary))]">
                Aanya
              </span>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg md:text-xl leading-relaxed mb-10">
              From no cricket gear to district hockey captain — her journey
              started on a dusty village field. PCube gave Aanya training and
              support; now she's dreaming of Olympic gold.
            </p>
            <Link href="/impact">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group inline-flex items-center gap-4 text-xs font-display tracking-[0.3em] text-[hsl(var(--primary))] border border-[hsl(var(--primary))]/30 px-8 py-4 rounded-full hover:bg-[hsl(var(--primary))]/10 transition-all uppercase"
              >
                Read Full Story
                <div className="w-6 h-6 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center transition-all group-hover:bg-[hsl(var(--primary))]/20 group-hover:rotate-45">
                  <ArrowUpRight size={14} weight="bold" />
                </div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========= WHY PCUBE ========= */}
      <section
        aria-label="Why PCube"
        className="py-32 lg:py-48 bg-[hsl(var(--card))]/30 relative"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-20">
            <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] uppercase border-b border-[hsl(var(--primary))]/30 pb-1">
              The Support System
            </span>
            <h2 className="mt-8 font-display text-5xl lg:text-7xl tracking-tighter text-[hsl(var(--foreground))] max-w-4xl leading-[0.9]">
              EVERYTHING A CHAMPION <br />
              <span className="font-editorial italic font-normal text-[hsl(var(--primary))]">
                Needs to Succeed
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyPcube.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  className="group p-8 rounded-[2.5rem] bg-black/20 border border-white/5 hover:bg-black/40 hover:border-white/10 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))]/20 flex items-center justify-center text-[hsl(var(--primary))] mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                    <Icon size={24} weight="light" />
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-[hsl(var(--foreground))] mb-3">
                    {item.title.toUpperCase()}
                  </h3>
                  <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========= PROGRAMS ========= */}
      <section aria-label="Programs" className="py-32 lg:py-48">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div>
              <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] uppercase border-b border-[hsl(var(--primary))]/30 pb-1">
                Multi-Sport Ecosystem
              </span>
              <h2 className="font-display text-6xl lg:text-8xl tracking-tighter text-[hsl(var(--foreground))] mt-8 leading-[0.85]">
                WHAT WE <br />
                <span className="font-editorial italic font-normal text-[hsl(var(--primary))]">
                  Build Together
                </span>
              </h2>
            </div>
            <Link href="/programs">
              <motion.button
                whileHover={{ gap: "1rem" }}
                className="flex items-center gap-3 text-xs font-display tracking-[0.3em] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-all uppercase"
              >
                View all programs <ArrowUpRight size={16} />
              </motion.button>
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto scrollbar-hide py-10">
          <div
            className="flex gap-8 px-6 lg:px-10"
            style={{ width: "max-content" }}
          >
            {programs.map((prog) => (
              <ProgramCard
                key={prog.sport}
                {...prog}
                icon={null
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========= INTERACTIVE GALLERY ========= */}
      <section
        aria-label="Interactive gallery"
        className="py-32 lg:py-48 bg-[hsl(var(--card))]/30 relative"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-16">
          <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] uppercase border-b border-[hsl(var(--primary))]/30 pb-1">
            Inside the Journey
          </span>
          <h2 className="mt-8 font-display text-6xl lg:text-8xl tracking-tighter text-[hsl(var(--foreground))] leading-[0.85]">
            THE{" "}
            <span className="font-editorial italic font-normal text-[hsl(var(--primary))] text-[1.1em]">
              Visual
            </span>{" "}
            <br />
            MOMENTS
          </h2>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 bg-black/20 p-4 rounded-[3rem] border border-white/5">
          <BentoGridGalleryDemo />
        </div>
      </section>

      {/* ========= IMPACT STORIES ========= */}
      <section
        aria-label="Impact Stories"
        className="py-32 lg:py-48 bg-[hsl(var(--background))] relative"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-20">
            <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] uppercase border-b border-[hsl(var(--primary))]/30 pb-1">
              Proof of Impact
            </span>
            <h2 className="mt-8 font-display text-6xl lg:text-8xl tracking-tighter text-[hsl(var(--foreground))] leading-[0.85]">
              THE <br />
              <span className="font-editorial italic font-normal text-[hsl(var(--primary))]">
                Prospects
              </span>
            </h2>
          </div>
          <div className="space-y-16">
            <StudentProfile
              name="Arjun Patil"
              sport="Field Hockey"
              achievement="Selected for Sub-Junior National Championship, 2024"
              journey="Arjun joined PCube Foundation at age 11 with raw talent and no equipment. Within two years of structured coaching, he earned his district selection and then his state berth — ultimately representing Maharashtra at the Sub-Junior National Championship."
              quote="PCube didn't just teach me hockey. They taught me how to compete."
              initials="AP"
              imageUrl="https://lh3.googleusercontent.com/pw/AP1GczMfFOVkuuBY6Sf2jiH7zJFQF_e2GHj3LfAoboKGlcDs9M-gK9THCb0EvW5a40Hagoq-icqboB7b8izWDaReg14-5sds1ni5MztToPLn9GZyHClapeTKVZFtQA7qH_Cta1n4aQ5OokEP8im33RJlIiuO=w1376-h917-s-no-gm?authuser=0"
            />
            <StudentProfile
              name="Sneha Jadhav"
              sport="Field Hockey"
              achievement="Selected for National School Games, 2024"
              journey="Sneha's family couldn't afford her equipment or travel costs. PCube covered every expense — from her first stick to her train ticket to the nationals. She went on to be one of the standout performers in her age group at the National School Games."
              quote="My mother cried when I told her I was going to Delhi for a national tournament. So did I."
              initials="SJ"
              imageUrl="https://lh3.googleusercontent.com/pw/AP1GczNa2XaKWb00wduVEkANE8V-oIMjmMeQCuzQ-m_To8qcyRVRQ9BYW7ELPvDKVrF0DZNNShO3UUVDIG_L3jIbxpZa2fgpTHhAoXAtFjGnThNpskDlKSYXJ1fhdejgk7s8GQ-Dy5r4ZXl9xQNBY7oS8h6q=w1376-h917-s-no-gm?authuser=0"
            />
          </div>
        </div>
      </section>

      {/* ========= DONATE CTA BAND ========= */}
      <section
        aria-label="Donate call to action"
        className="py-24 border-t border-white/5 bg-[hsl(var(--primary))]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center md:text-left">
            <p className="font-display text-[clamp(2rem,5vw,4rem)] leading-[0.9] tracking-tighter text-[hsl(var(--primary-foreground))]">
              EVERY RUPEE FUNDS A CHILD'S SHOT AT THE{" "}
              <span className="font-editorial italic font-normal">
                Championship.
              </span>
            </p>
            <p className="mt-4 text-[hsl(var(--primary-foreground))]/60 text-sm font-display tracking-[0.15em] uppercase">
              All donations are 80G tax-exempt.
            </p>
          </div>
          <Link href="/donate">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group flex-shrink-0 bg-[hsl(var(--primary-foreground))] text-[hsl(var(--primary))] font-display tracking-[0.2em] text-sm px-12 py-6 rounded-full shadow-2xl overflow-hidden flex items-center gap-3 uppercase"
            >
              <span>Donate Now</span>
              <div className="w-8 h-8 rounded-full bg-[hsl(var(--primary))]/10 flex items-center justify-center transition-all group-hover:bg-[hsl(var(--primary))]/20 group-hover:rotate-45">
                <ArrowUpRight size={18} weight="bold" />
              </div>
            </motion.button>
          </Link>
        </div>
      </section>

      {/* ========= COMMUNITY VOICES ========= */}
      <section
        aria-label="Community voices"
        className="py-24 lg:py-32 bg-[hsl(var(--card))]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="mb-16">
            <span className="font-display text-xs tracking-[0.3em] text-[hsl(var(--primary))] uppercase border-b border-[hsl(var(--primary))]/30 pb-1">
              What They Say
            </span>
            <h2 className="mt-6 font-display text-4xl lg:text-6xl tracking-tighter text-[hsl(var(--foreground))]">
              COMMUNITY{" "}
              <span className="font-editorial italic font-normal text-[hsl(var(--primary))]">
                Voices
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={prefersReduced ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.15,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-[hsl(var(--background))] border border-[hsl(var(--border))] p-8 rounded-[2rem] hover:border-white/10 transition-colors duration-500"
                data-testid={`testimonial-${i}`}
              >
                <div className="text-[hsl(var(--primary))] text-5xl font-editorial leading-none select-none mb-4">
                  "
                </div>
                <p className="text-[hsl(var(--foreground))] text-sm leading-relaxed mb-8 italic font-editorial text-lg">
                  {t.quote}
                </p>
                <div>
                  <p className="font-display text-sm tracking-[0.15em] text-[hsl(var(--primary))]">
                    {t.author.toUpperCase()}
                  </p>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
