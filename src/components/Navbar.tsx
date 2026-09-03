"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { GlobalContent } from "@/lib/cms";

export default function Navbar({
  siteInfo,
  navLinks,
  socialLinks,
}: {
  siteInfo: GlobalContent["siteInfo"];
  navLinks: GlobalContent["navLinks"];
  socialLinks: GlobalContent["socialLinks"];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-500 ${
        scrolled ? "border-white/10 bg-navy/90 py-2.5 backdrop-blur-md" : "border-transparent bg-navy py-4 md:py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-8">
        <Link href="/#home" className="flex items-center shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={siteInfo.logo}
            alt={siteInfo.name}
            width={140}
            height={56}
            className={`w-auto object-contain transition-all duration-500 ${scrolled ? "h-9" : "h-11 md:h-12"}`}
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <li key={link.href} className="group relative">
              <Link
                href={link.href}
                className="font-heading text-[13px] font-medium tracking-[0.08em] text-white/80 uppercase transition-colors hover:text-gold-light"
              >
                {link.label}
              </Link>
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-out group-hover:w-full" />
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={socialLinks.call}
            className="btn-outline-gold tap-target inline-flex items-center justify-center rounded-full px-6 py-2.5 text-xs"
          >
            Call Now
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          className="tap-target flex flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-gold-light"
          />
          <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="h-px w-6 bg-gold-light" />
          <motion.span
            animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-px w-6 bg-gold-light"
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-navy md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 pb-4 pt-3">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="tap-target flex items-center border-b border-white/5 py-3 font-heading text-sm font-medium tracking-wide text-white/85 uppercase"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="px-5 pb-6 pt-2">
              <a href={socialLinks.call} className="btn-gold tap-target flex w-full items-center justify-center rounded-full px-5 py-3 text-xs">
                Call Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
