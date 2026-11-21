// @flow strict

import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { TbBinaryTree2 } from "react-icons/tb";
import { VscSymbolClass } from "react-icons/vsc";
import { HiOutlineCode } from "react-icons/hi";

// Icons for skills that have no logo in utils/skill-image.js
const fallbackIcons = { DSA: TbBinaryTree2, OOPS: VscSymbolClass };
import Reveal from "../../helper/reveal";
import SectionTitle from "../../helper/section-title";

// One accent per card so the grid feels colorful.
const accents = [
  "hover:shadow-violet-500/30 group-hover:from-violet-500/25",
  "hover:shadow-pink-500/30 group-hover:from-pink-500/25",
  "hover:shadow-cyan-400/30 group-hover:from-cyan-400/25",
  "hover:shadow-amber-400/30 group-hover:from-amber-400/25",
  "hover:shadow-emerald-400/30 group-hover:from-emerald-400/25",
  "hover:shadow-sky-400/30 group-hover:from-sky-400/25",
];

function Skills() {
  return (
    <section id="skills" className="relative py-20 lg:py-28">
      <SectionTitle label="Tech stack" title="Skills &" highlight="Tools" />

      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {skillsData.map((skill, i) => {
          const accent = accents[i % accents.length];
          const icon = skillsImage(skill)?.src;
          return (
            <Reveal key={skill} delay={i * 80}>
              <div
                className={`group relative h-full overflow-hidden rounded-2xl glass p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-2xl ${accent.split(" ")[0]}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent transition-all duration-500 ${accent.split(" ")[1]}`} />
                <div className="relative flex flex-col items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-lg shadow-black/30 ring-1 ring-white/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    {icon ? (
                      <Image src={icon} alt={skill} width={36} height={36} className="h-9 w-9 object-contain" />
                    ) : (
                      (() => { const Fallback = fallbackIcons[skill] || HiOutlineCode; return <Fallback className="text-violet-600" size={32} aria-hidden="true" />; })()
                    )}
                  </div>
                  <p className="font-display text-base font-semibold sm:text-lg">{skill}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

export default Skills;
