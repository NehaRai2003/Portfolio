// @flow strict

import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import { FiArrowUpRight } from 'react-icons/fi';
import { HiOutlineEye, HiOutlineTranslate } from 'react-icons/hi';

const chipColors = [
  'bg-violet-500/15 text-violet-200 ring-violet-400/30',
  'bg-pink-500/15 text-pink-200 ring-pink-400/30',
  'bg-cyan-400/15 text-cyan-200 ring-cyan-300/30',
  'bg-amber-400/15 text-amber-200 ring-amber-300/30',
];

// Stylised "face scan" illustration (computer vision projects)
function FaceScanVisual() {
  return (
    <div className="relative h-32 w-32 sm:h-40 sm:w-40 transition-transform duration-700 group-hover:scale-105">
      <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-cyan-300/50" />
      {['left-0 top-0 border-l-4 border-t-4 rounded-tl-2xl', 'right-0 top-0 border-r-4 border-t-4 rounded-tr-2xl',
        'left-0 bottom-0 border-l-4 border-b-4 rounded-bl-2xl', 'right-0 bottom-0 border-r-4 border-b-4 rounded-br-2xl']
        .map((c) => <span key={c} className={`absolute h-8 w-8 border-pink-400 ${c}`} />)}
      <div className="absolute inset-0 flex items-center justify-center">
        <HiOutlineEye className="text-white/90 drop-shadow-[0_0_18px_rgba(236,72,153,0.8)]" size={56} />
      </div>
      <div className="absolute inset-x-3 top-3 h-0.5 animate-[scan_2.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.9)]" />
    </div>
  );
}

// Stylised text -> language prediction illustration (NLP projects)
const samples = [
  { text: 'नमस्ते, आप कैसे हैं?', lang: 'Hindi', color: 'text-pink-300' },
  { text: 'Hello, how are you?', lang: 'English', color: 'text-cyan-300' },
];

function LanguageVisual() {
  return (
    <div className="flex w-full max-w-[17rem] flex-col gap-3 transition-transform duration-700 group-hover:scale-105">
      {samples.map((s, i) => (
        <div
          key={s.lang}
          className="float flex items-center justify-between gap-3 rounded-xl glass px-4 py-2.5"
          style={{ animationDelay: `${i * -2}s` }}
        >
          <span className="truncate text-sm text-white/90">{s.text}</span>
          <span className={`shrink-0 font-mono text-xs font-semibold ${s.color}`}>
            → {s.lang}
          </span>
        </div>
      ))}
      <div className="mt-1 flex items-center justify-center gap-2 text-xs text-[var(--muted)]">
        <HiOutlineTranslate className="text-[var(--cyan)]" size={16} />
        Naive Bayes classifier
      </div>
    </div>
  );
}

function ProjectCard({ project, index = 0 }) {
  const number = String(index + 1).padStart(2, '0');
  const flip = index % 2 === 1;

  return (
    <article className="gradient-border group overflow-hidden">
      <div className={`grid grid-cols-1 ${flip ? 'lg:grid-cols-[1.1fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1.1fr]'}`}>
        {/* Visual */}
        <div className={`relative flex min-h-[280px] ${flip ? 'lg:order-2' : ''} items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_30%_30%,rgba(139,92,246,0.45),transparent_55%),radial-gradient(circle_at_75%_70%,rgba(236,72,153,0.35),transparent_55%),radial-gradient(circle_at_60%_10%,rgba(34,211,238,0.25),transparent_50%)] p-8`}>
          <span className="font-display absolute left-6 top-4 text-6xl font-bold text-white/10">{number}</span>

          {project.visual === 'language' ? <LanguageVisual /> : <FaceScanVisual />}

          {project.highlight && (
            <span className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium">
              <span className="pulse-dot h-2 w-2 rounded-full bg-rose-400" />
              {project.highlight}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">
            {project.role}{project.category && ` · ${project.category}`}
          </span>
          <h3 className="font-display mt-3 text-2xl font-bold sm:text-3xl">{project.name}</h3>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tools.map((tool, i) => (
              <span key={tool} className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${chipColors[i % chipColors.length]}`}>
                {tool}
              </span>
            ))}
          </div>

          {(project.code || project.demo) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.code && (
                <Link href={project.code} target="_blank" className="btn-ghost !py-2.5">
                  <BsGithub /> Code
                </Link>
              )}
              {project.demo && /^https?:\/\//.test(project.demo) && (
                <Link href={project.demo} target="_blank" className="btn-primary !py-2.5">
                  Live demo <FiArrowUpRight />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
