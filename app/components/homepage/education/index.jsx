// @flow strict
import { educations } from "@/utils/data/educations";
import { HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlinePencil } from "react-icons/hi";
import Reveal from "../../helper/reveal";
import SectionTitle from "../../helper/section-title";

const styles = [
  { icon: HiOutlineAcademicCap, dot: "from-violet-500 to-pink-500", text: "text-violet-300" },
  { icon: HiOutlineBookOpen, dot: "from-pink-500 to-amber-400", text: "text-pink-300" },
  { icon: HiOutlinePencil, dot: "from-cyan-400 to-violet-500", text: "text-cyan-300" },
];

function Education() {
  return (
    <section id="education" className="relative py-20 lg:py-28">
      <SectionTitle label="Journey" title="My" highlight="Education" />

      <div className="relative mx-auto max-w-3xl">
        {/* timeline line */}
        <div className="absolute bottom-4 left-6 top-4 w-px bg-gradient-to-b from-violet-500 via-pink-500 to-cyan-400 sm:left-1/2" />

        <div className="flex flex-col gap-10">
          {educations.map((education, i) => {
            const s = styles[i % styles.length];
            const right = i % 2 === 1;
            return (
              <Reveal key={education.id} delay={i * 120} className="relative">
                <div className={`flex items-start gap-6 sm:w-1/2 ${right ? "sm:ml-auto sm:pl-12" : "sm:pr-12 sm:flex-row-reverse sm:text-right"}`}>
                  <span
                    className={`absolute left-6 top-5 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br ${s.dot} text-white shadow-lg ring-4 ring-[var(--bg)] sm:left-1/2`}
                  >
                    <s.icon size={22} />
                  </span>
                  <div className="ml-14 w-full rounded-2xl glass p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 sm:ml-0">
                    <span className={`text-sm font-semibold ${s.text}`}>{education.duration}</span>
                    <h3 className="font-display mt-2 text-lg font-bold sm:text-xl">{education.title}</h3>
                    <p className="mt-1 text-[var(--muted)]">{education.institution}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;
