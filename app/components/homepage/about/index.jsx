// @flow strict

import { personalData } from "@/utils/data/personal-data";
import { projectsData } from "@/utils/data/projects-data";
import Image from "next/image";
import { HiOutlineAcademicCap, HiOutlineBadgeCheck, HiOutlineLightBulb, HiOutlineSparkles, HiOutlineTranslate } from "react-icons/hi";
import { certifications } from "@/utils/data/certifications";
import Reveal from "../../helper/reveal";
import SectionTitle from "../../helper/section-title";

function AboutSection() {
  const initials = personalData.name.split(" ").map((w) => w[0]).join("");

  const highlights = [
    { icon: HiOutlineAcademicCap, value: "B.Tech", label: "CSE · AI & ML", color: "from-violet-500 to-fuchsia-500" },
    { icon: HiOutlineBadgeCheck, value: `${certifications.length}`, label: "Certifications", color: "from-pink-500 to-rose-500" },
    { icon: HiOutlineSparkles, value: `${projectsData.length}`, label: projectsData.length === 1 ? "AI Project" : "AI / ML Projects", color: "from-cyan-400 to-sky-500" },
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28">
      <SectionTitle label="About me" title="Who" highlight="I am" />

      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
        <Reveal className="mx-auto">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72">
            <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_0deg,#8b5cf6,#ec4899,#fbbf24,#22d3ee,#8b5cf6)] p-[3px]" />
            <div className="absolute inset-[3px] overflow-hidden rounded-[14px] bg-[var(--bg-soft)]">
              {personalData.profile ? (
                <Image
                  src={personalData.profile}
                  fill
                  sizes="288px"
                  alt={personalData.name}
                  className="object-cover"
                />
              ) : (
                <div aria-label={personalData.name} className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.35),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_60%)]">
                  <span className="font-display text-8xl font-bold text-gradient">{initials}</span>
                </div>
              )}
            </div>
            <span className="float absolute -right-2 top-6 z-10 rounded-2xl border border-white/10 bg-[var(--bg-soft)] shadow-lg px-3 py-2 text-xs font-semibold">
              🎓 LNCT &apos;25
            </span>
            <span className="float absolute -left-4 bottom-8 z-10 rounded-2xl border border-white/10 bg-[var(--bg-soft)] shadow-lg px-3 py-2 text-xs font-semibold [animation-delay:-3s]">
              🤖 AI / ML
            </span>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="text-base leading-relaxed text-[var(--muted)] lg:text-lg">
              {personalData.description}
            </p>
          </Reveal>

          {[
            { label: "Languages", items: personalData.languages, icon: HiOutlineTranslate },
            { label: "Strengths", items: personalData.softSkills, icon: HiOutlineLightBulb },
          ].filter((row) => row.items?.length > 0).map((row, i) => (
            <Reveal key={row.label} delay={100 + i * 80} className={`${i === 0 ? "mt-6" : "mt-3"} flex flex-wrap items-center gap-2`}>
              <span className="mr-1 flex items-center gap-2 text-sm text-[var(--muted)]">
                <row.icon className="text-[var(--cyan)]" size={18} />
                {row.label}:
              </span>
              {row.items.map((item) => (
                <span key={item} className="rounded-full glass px-3 py-1 text-sm font-medium">{item}</span>
              ))}
            </Reveal>
          ))}

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 120}>
                <div className="group h-full rounded-2xl glass p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                  <span className={`inline-flex rounded-xl bg-gradient-to-br ${h.color} p-2.5 text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                    <h.icon size={22} />
                  </span>
                  <p className="font-display mt-4 text-2xl font-bold">{h.value}</p>
                  <p className="text-sm text-[var(--muted)]">{h.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
