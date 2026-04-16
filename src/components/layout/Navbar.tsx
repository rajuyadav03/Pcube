import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "@phosphor-icons/react";

const navLinks = [
  { href: "/", label: "PCube" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/donate", label: "Donate" },
];

const allLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/impact", label: "Impact" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/media", label: "Media" },
  { href: "/contact", label: "Contact" },
  { href: "/donate", label: "Donate" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Disable body scroll when menu open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* FLUID ISLAND NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none"
        data-testid="navbar"
        style={{
          paddingTop: scrolled ? "12px" : "20px",
          transition: "padding-top 0.5s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
          className="pointer-events-auto flex w-full max-w-[calc(100vw-1rem)] lg:w-auto items-center justify-between lg:justify-start gap-2 lg:gap-1 rounded-full px-2 sm:px-2.5 py-1.5 sm:py-2 shadow-2xl"
          style={{
            backdropFilter: "blur(24px) saturate(1.4)",
            WebkitBackdropFilter: "blur(24px) saturate(1.4)",
            backgroundColor: scrolled
              ? "rgba(8,8,12,0.88)"
              : "rgba(8,8,12,0.45)",
            border: scrolled
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(255,255,255,0.06)",
            transition: "background-color 0.5s ease, border-color 0.5s ease",
          }}
        >
          {/* LOGO */}
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2 px-3 sm:px-5 py-2 cursor-pointer group">
              <img
                src="/logo-2.png"
                alt="PCube Foundation logo"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm object-cover transition-transform duration-300 group-hover:scale-110"
                loading="eager"
                decoding="async"
              />
              <span className="font-display text-lg tracking-tight text-[hsl(var(--foreground))] hidden sm:block">
                PC<span className="text-[hsl(var(--primary))]">UBE</span>
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks
              .filter((l) => l.href !== "/")
              .map((link) => {
                const isActive = location === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span
                      className={`relative px-4 py-2 rounded-full text-[11px] font-display tracking-[0.15em] uppercase cursor-pointer transition-all duration-300 ${
                        isActive
                          ? "text-[hsl(var(--primary))] bg-[hsl(var(--primary))]/8"
                          : "text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-white/[0.04]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                );
              })}
          </div>

          {/* MOBILE TOGGLE */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden ml-auto w-12 h-12 sm:w-11 sm:h-11 rounded-full bg-white/5 border border-white/8 flex items-center justify-center text-foreground hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            {isMenuOpen ? (
              <X size={18} weight="bold" />
            ) : (
              <List size={18} weight="bold" />
            )}
          </motion.button>

          {/* DESKTOP CONTACT + DONATE */}
          <div className="hidden lg:flex items-center gap-2 ml-1">
            <Link href="/contact" data-testid="link-nav-contact">
              <span className="px-4 py-2 rounded-full text-[11px] font-display tracking-[0.15em] uppercase text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-white/[0.04] transition-all cursor-pointer">
                Contact
              </span>
            </Link>

            <Link href="/donate" data-testid="link-donate-nav">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-full px-6 py-2.5 text-[10px] font-display tracking-[0.2em] uppercase hover:brightness-110 transition-all shadow-lg shadow-[hsl(var(--primary))]/15"
                data-testid="button-donate-nav"
              >
                Donate Now
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-40 bg-[hsl(var(--background))]/95 backdrop-blur-2xl lg:hidden flex flex-col items-center justify-center overflow-y-auto overscroll-contain px-6 py-24"
            data-testid="mobile-menu"
          >
            {/* Close button at top */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-[max(1rem,env(safe-area-inset-top))] right-4 w-11 h-11 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-[hsl(var(--foreground))]"
              aria-label="Close menu"
            >
              <X size={22} weight="bold" />
            </motion.button>

            <nav className="flex w-full max-w-sm flex-col items-center gap-3">
              {allLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.5,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span
                      onClick={() => setIsMenuOpen(false)}
                      className={`block w-full text-center py-3 font-editorial text-[clamp(1.75rem,8vw,2.5rem)] leading-tight italic cursor-pointer transition-colors duration-200 ${
                        location === link.href
                          ? "text-[hsl(var(--primary))]"
                          : "text-[hsl(var(--foreground))] hover:text-[hsl(var(--primary))]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Donate CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: allLinks.length * 0.06 + 0.1,
                duration: 0.5,
              }}
              className="mt-8 w-full max-w-sm"
            >
              <Link href="/donate" data-testid="link-mobile-donate-cta">
                <span
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] font-display tracking-[0.2em] text-xs sm:text-sm px-8 py-3.5 rounded-full cursor-pointer shadow-xl shadow-[hsl(var(--primary))]/20"
                >
                  DONATE NOW
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
