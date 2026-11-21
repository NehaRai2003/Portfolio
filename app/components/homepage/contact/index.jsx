// @flow strict
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { IoLogoGithub } from "react-icons/io";
import Reveal from '../../helper/reveal';
import SectionTitle from '../../helper/section-title';
import ContactForm from './contact-form';

function ContactSection() {
  const items = [
    { icon: HiOutlineMail, label: "Email", value: personalData.email, href: `mailto:${personalData.email}`, color: "from-violet-500 to-fuchsia-500" },
    personalData.phone && { icon: HiOutlinePhone, label: "Phone", value: personalData.phone, href: `tel:${personalData.phone}`, color: "from-emerald-400 to-cyan-500" },
    { icon: HiOutlineLocationMarker, label: "Location", value: personalData.address, color: "from-pink-500 to-amber-400" },
  ].filter(Boolean);

  return (
    <section id="contact" className="relative py-20 lg:py-28">
      <SectionTitle label="Contact" title="Let's" highlight="work together" />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
        <Reveal className="flex flex-col gap-6">
          <div className="rounded-3xl gradient-border p-7 sm:p-8">
            <h3 className="font-display text-2xl font-bold">I&apos;m open to opportunities ✨</h3>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Looking for a fresher role or internship as a Software Developer. Have a question, an
              opportunity, or just want to say hi? My inbox is always open.
            </p>
          </div>

          {items.map((item) => {
            const content = (
              <div className="group flex items-center gap-4 rounded-2xl glass p-4 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <item.icon size={22} />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[var(--muted)]">{item.label}</p>
                  <p className="truncate font-medium">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? <Link key={item.label} href={item.href}>{content}</Link> : <div key={item.label}>{content}</div>;
          })}

          <div className="flex items-center gap-3">
            {personalData.github && (
              <Link target="_blank" href={personalData.github} aria-label="GitHub"
                className="rounded-full glass p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--violet)] hover:text-white">
                <IoLogoGithub size={22} />
              </Link>
            )}
            <Link target="_blank" href={personalData.linkedIn} aria-label="LinkedIn"
              className="rounded-full glass p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--cyan)] hover:text-white">
              <BiLogoLinkedin size={22} />
            </Link>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

export default ContactSection;
