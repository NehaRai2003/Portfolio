"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { experiences } from "@/utils/data/experience";
import { appsData } from "@/utils/data/apps-data";
import { personalData } from "@/utils/data/personal-data";
import { certifications } from "@/utils/data/certifications";

const links = [
  { href: "/#about", label: "About" },
  ...(experiences.length > 0 ? [{ href: "/#experience", label: "Experience" }] : []),
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#ai-demo", label: "Try AI" },
  ...(appsData.length > 0 ? [{ href: "/#apps", label: "Apps" }] : []),
  ...(certifications.length > 0 ? [{ href: "/#certifications", label: "Certifications" }] : []),
  { href: "/#education", label: "Education" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = personalData.name.split(" ").map((w) => w[0]).join("");

  return (
    <header className="sticky top-0 z-[60] px-4 pt-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ${
          scrolled ? "glass shadow-[0_10px_40px_-15px_rgba(139,92,246,0.5)]" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="font-display flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-pink-500 text-sm font-bold text-white">
            {initials}
          </span>
          <span className="font-display text-lg font-bold tracking-tight">{personalData.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-[var(--muted)] transition-colors duration-300 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="ml-2">
            <Link href="/#contact" className="btn-primary !px-5 !py-2">
              Hire me
            </Link>
          </li>
        </ul>

        <button
          className="rounded-full p-2 text-2xl md:hidden hover:bg-white/10"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      <div
        className={`mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl glass transition-all duration-500 md:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 border-transparent"
        }`}
      >
        <ul className="flex flex-col p-3">
          {[...links, { href: "/#contact", label: "Contact" }].map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-[var(--muted)] hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

export default Navbar;
