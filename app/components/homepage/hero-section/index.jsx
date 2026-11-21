// @flow strict

import { skillsData } from "@/utils/data/skills";
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload, MdOutlineEmail } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { RiContactsFill } from "react-icons/ri";
import TypingText from "../../helper/typing-text";
import Reveal from "../../helper/reveal";
import ResumeViewer from "../../helper/resume-viewer";

const roles = [personalData.designation, "Python Developer", "AI & ML Enthusiast", "Problem Solver"];

function HeroSection() {
  const firstName = personalData.name.split(" ")[0];

  return (
    <section className="relative grid min-h-[calc(100vh-6rem)] grid-cols-1 items-center gap-12 py-12 lg:grid-cols-[1.15fr_1fr] lg:py-20">
      <div className="flex min-w-0 flex-col items-start">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-2 text-xs font-medium text-emerald-300 sm:text-sm">
            <span className="pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
            Open to work · Fresher · 2025 Graduate
          </span>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="font-display mt-6 text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl">
            Hi, I&apos;m <br />
            <span className="text-gradient">{personalData.name}</span>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="font-display mt-5 min-h-[2.5rem] text-xl font-medium text-[var(--muted)] sm:text-2xl lg:text-3xl">
            <TypingText words={roles} />
          </p>
        </Reveal>

        <Reveal delay={300}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            B.Tech CSE (AI &amp; ML) graduate who loves turning ideas into working software, from
            Python and databases to computer vision projects that solve real problems.
          </p>
        </Reveal>

        <Reveal delay={400} className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="#contact" className="btn-primary">
            <RiContactsFill size={18} />
            Contact me
          </Link>
          {personalData.resume ? (
            <>
              <ResumeViewer src={personalData.resume} />
              <Link href={personalData.resume} download className="btn-ghost">
                <MdDownload size={18} />
                Download
              </Link>
            </>
          ) : (
            <Link href="#projects" className="btn-ghost">
              View my work
            </Link>
          )}
        </Reveal>

        <Reveal delay={500} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[var(--muted)]">
          <span className="flex items-center gap-2">
            <HiOutlineLocationMarker className="text-[var(--pink)]" size={18} />
            {personalData.address}
          </span>
          <div className="flex items-center gap-3">
            {personalData.github && (
              <Link href={personalData.github} target="_blank" aria-label="GitHub"
                className="rounded-full glass p-2.5 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:border-[var(--violet)]">
                <BsGithub size={18} />
              </Link>
            )}
            <Link href={personalData.linkedIn} target="_blank" aria-label="LinkedIn"
              className="rounded-full glass p-2.5 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:border-[var(--cyan)]">
              <BsLinkedin size={18} />
            </Link>
            <Link href={`mailto:${personalData.email}`} aria-label="Email"
              className="rounded-full glass p-2.5 transition-all duration-300 hover:-translate-y-1 hover:text-white hover:border-[var(--pink)]">
              <MdOutlineEmail size={18} />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Code card */}
      <Reveal delay={300} className="relative min-w-0">
        <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-violet-600/30 via-pink-500/20 to-cyan-400/30 blur-3xl" />
        <div className="float gradient-border overflow-hidden shadow-2xl shadow-violet-900/40">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3.5">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <span className="font-mono text-xs text-[var(--muted)]">{firstName.toLowerCase()}.py</span>
          </div>
          <pre className="overflow-x-auto px-5 py-6 font-mono text-[13px] leading-7 sm:text-sm lg:px-7">
            <code>
              <span className="text-pink-400">class</span> <span className="text-amber-300">Developer</span>
              <span className="text-gray-400">:</span>{"\n"}
              {"    "}<span className="text-violet-300">name</span> <span className="text-pink-400">=</span>{" "}
              <span className="text-emerald-300">&quot;{personalData.name}&quot;</span>{"\n"}
              {"    "}<span className="text-violet-300">role</span> <span className="text-pink-400">=</span>{" "}
              <span className="text-emerald-300">&quot;{personalData.designation}&quot;</span>{"\n"}
              {"    "}<span className="text-violet-300">skills</span> <span className="text-pink-400">=</span>{" "}
              <span className="text-gray-400">[</span>
              {skillsData.map((s, i) => (
                <span key={s}>
                  {i % 3 === 0 && <>{"\n"}{"        "}</>}
                  <span className="text-emerald-300">&quot;{s}&quot;</span>
                  <span className="text-gray-400">, </span>
                </span>
              ))}
              {"\n"}{"    "}<span className="text-gray-400">]</span>{"\n"}
              {"    "}<span className="text-violet-300">quick_learner</span> <span className="text-pink-400">=</span>{" "}
              <span className="text-cyan-300">True</span>{"\n"}
              {"    "}<span className="text-violet-300">problem_solver</span> <span className="text-pink-400">=</span>{" "}
              <span className="text-cyan-300">True</span>{"\n\n"}
              {"    "}<span className="text-pink-400">def</span> <span className="text-sky-300">hireable</span>
              <span className="text-gray-400">(self):</span>{"\n"}
              {"        "}<span className="text-pink-400">return</span>{" "}
              <span className="text-gray-400">(self.</span>quick_learner{"\n"}
              {"                "}<span className="text-pink-400">and</span>{" "}
              <span className="text-gray-400">self.</span>problem_solver
              <span className="text-gray-400">)</span>
            </code>
          </pre>
        </div>
      </Reveal>
    </section>
  );
}

export default HeroSection;
