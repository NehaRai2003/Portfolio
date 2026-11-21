"use client";

import { useMemo, useState } from "react";
import { HiOutlineSparkles, HiOutlineTranslate } from "react-icons/hi";
import Reveal from "../../helper/reveal";
import SectionTitle from "../../helper/section-title";
import { identify } from "./language-model";

const flags = {
  English: "🇬🇧", Hindi: "🇮🇳", Hinglish: "🇮🇳", Spanish: "🇪🇸",
  French: "🇫🇷", German: "🇩🇪", Italian: "🇮🇹", Portuguese: "🇵🇹",
};

const examples = [
  "Machine learning is changing the way we build software.",
  "मुझे नई चीज़ें सीखना बहुत पसंद है",
  "Aaj mausam bahut accha hai, chalo bahar chalte hain",
  "¿Dónde está la biblioteca más cercana?",
  "Je voudrais un café, s'il vous plaît.",
  "Ich lerne jeden Tag etwas Neues.",
];

const barColors = ["from-violet-500 to-pink-500", "from-cyan-400 to-sky-500", "from-amber-400 to-orange-500"];

export default function AiDemo() {
  const [text, setText] = useState(examples[0]);
  const result = useMemo(() => identify(text), [text]);
  const top = result?.ranking?.slice(0, 3) ?? [];

  return (
    <section id="ai-demo" className="relative py-20 lg:py-28">
      <SectionTitle label="Live demo" title="Try my" highlight="AI" />

      <Reveal className="mx-auto max-w-4xl">
        <div className="gradient-border p-6 sm:p-8">
          <div className="mb-6 flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-pink-500 text-white">
              <HiOutlineTranslate size={22} />
            </span>
            <div>
              <h3 className="font-display text-xl font-bold">Language Identification</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Type a sentence in any of 8 languages. A small Naive Bayes model, based on my
                Language Identification project, guesses the language right in your browser.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <div>
              <label htmlFor="lang-input" className="sr-only">Text to identify</label>
              <textarea
                id="lang-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                maxLength={500}
                placeholder="Type something…"
                className="w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-base outline-none transition-colors focus:border-[var(--violet)]"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => setText(ex)}
                    className="max-w-[14rem] truncate rounded-full glass px-3 py-1.5 text-xs text-[var(--muted)] transition-colors hover:text-white"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5" aria-live="polite">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--cyan)]">Prediction</p>

              {!result && <p className="mt-4 text-sm text-[var(--muted)]">Start typing to see a prediction.</p>}

              {result?.unsure && (
                <p className="mt-4 text-sm text-[var(--muted)]">
                  Not sure yet. Try a longer sentence with common words.
                </p>
              )}

              {top.length > 0 && (
                <>
                  <p className="font-display mt-3 flex items-center gap-2 text-2xl font-bold">
                    <span>{flags[top[0].lang]}</span>
                    <span className="text-gradient">{top[0].lang}</span>
                  </p>
                  <ul className="mt-5 space-y-3">
                    {top.map(({ lang, p }, i) => (
                      <li key={lang}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span>{lang}</span>
                          <span className="font-mono text-[var(--muted)]">{(p * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${barColors[i]} transition-all duration-500`}
                            style={{ width: `${Math.max(p * 100, 1)}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <p className="mt-6 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                <HiOutlineSparkles className="text-[var(--amber)]" />
                Runs fully in your browser. Nothing is sent to a server.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
