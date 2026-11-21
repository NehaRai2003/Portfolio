// @flow strict
import { certifications } from "@/utils/data/certifications";
import Link from "next/link";
import { FaAws } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineBadgeCheck } from "react-icons/hi";
import { SiCisco } from "react-icons/si";
import Reveal from "../../helper/reveal";
import SectionTitle from "../../helper/section-title";

const issuers = {
  cisco: {
    icon: SiCisco,
    badge: "from-sky-400 to-cyan-500",
    glow: "hover:shadow-cyan-500/25",
    text: "text-cyan-300",
  },
  aws: {
    icon: FaAws,
    badge: "from-amber-400 to-orange-500",
    glow: "hover:shadow-amber-500/25",
    text: "text-amber-300",
  },
  default: {
    icon: HiOutlineBadgeCheck,
    badge: "from-violet-500 to-pink-500",
    glow: "hover:shadow-pink-500/25",
    text: "text-pink-300",
  },
};

function Certifications() {
  return (
    <section id="certifications" className="relative py-20 lg:py-28">
      <SectionTitle label="Credentials" title="Certifications &" highlight="Courses" />

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert, i) => {
          const s = issuers[cert.issuerKey] || issuers.default;
          return (
            <Reveal key={cert.id} delay={i * 90}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6 transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl ${s.glow}`}
              >
                <div className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${s.badge} opacity-10 blur-2xl transition-opacity duration-500 group-hover:opacity-30`} />

                <div className="flex items-center justify-between">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.badge} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                    <s.icon size={26} />
                  </span>
                  <HiOutlineBadgeCheck className="text-emerald-400" size={24} aria-label="Certified" />
                </div>

                <h3 className="font-display mt-5 text-lg font-semibold leading-snug">{cert.title}</h3>
                <p className={`mt-2 text-sm font-medium ${s.text}`}>{cert.issuer}</p>

                {cert.link && (
                  <Link
                    href={cert.link}
                    target="_blank"
                    className="mt-5 inline-flex items-center gap-1 text-sm text-[var(--muted)] transition-colors hover:text-white"
                  >
                    View credential <FiArrowUpRight />
                  </Link>
                )}
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default Certifications;
