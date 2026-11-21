"use client";

import { useEffect, useState } from "react";

// Cycles through words with a typing / deleting effect.
export default function TypingText({ words }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const done = !deleting && text === word;
    const cleared = deleting && text === "";

    const timeout = setTimeout(
      () => {
        if (done) return setDeleting(true);
        if (cleared) {
          setDeleting(false);
          return setIndex((i) => i + 1);
        }
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      },
      done ? 1600 : deleting ? 45 : 90
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return (
    <span aria-label={words.join(", ")}>
      <span className="text-gradient-cool">{text}</span>
      <span className="caret h-[0.9em] align-middle" />
    </span>
  );
}
