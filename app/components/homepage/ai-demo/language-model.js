// A tiny in-browser Naive Bayes language identifier.
// Each language is "trained" on a list of its most frequent words; the
// classifier scores a sentence with Laplace-smoothed word likelihoods and
// adds a small boost for characters that only appear in certain languages.

const vocab = {
  English: "the of and to in is it you that he was for on are with as i his they be at one have this from or had by not but what all were we when your can said there use an each which she do how their if will up other about out many then them these so some her would make like him into has look more two see no way could people my than been who its now find long down day did get come made may part am very just also our well hello hi hey thanks please".split(" "),
  Hindi: "है हैं का की के में और को से पर यह वह था थी थे भी नहीं तो ही एक हम आप मैं तुम क्या कि जो लिए कर करना रहा रही रहे होता होती गया गई दिया बहुत अपने उनके इस उस कुछ सब अब यहाँ वहाँ".split(" "),
  Hinglish: "hai hain ka ki ke mein main aur ko se par yeh woh wo tha thi the bhi nahi nahin toh to hi ek hum aap tum kya kyun kaise jo liye kar karna raha rahi rahe hota hoti gaya gayi diya bahut apne unke iss us kuch sab ab yahan wahan mujhe tujhe accha acha haan yaar kal aaj kaha kab".split(" "),
  Spanish: "el la de que y en los se del las un por con no una su para es al lo como más pero sus le ya o este sí porque esta entre cuando muy sin sobre también me hasta hay donde quien hola gracias desde todo nos durante todos uno les ni contra otros ese eso ante ellos e esto mí antes algunos qué unos yo otro otras otra él tanto esa estos mucho".split(" "),
  French: "le la de et les des en un une du est que il qui pas ne dans pour au sur se plus par avec ce son sont je vous nous elle mais ou comme tout ses aux leur cette été être fait bien sans peut mon très ils elles aussi même lui deux ont avoir était où ça c'est moi toi bonjour merci salut".split(" "),
  German: "der die und in den von zu das mit sich des auf für ist im dem nicht ein eine als auch es an werden aus er hat dass sie nach wird bei einer um am sind noch wie einem über einen so zum war haben nur oder aber vor zur bis mehr durch man sehr ich du wir ihr mein hallo danke".split(" "),
  Italian: "il di che e la per un in è non una sono le da mi si lo ma ha con cosa questo ti gli ho io bene tu come del più se alla anche della nel dei mio molto sei grazie perché quando sempre essere fatto ancora tutto tutti questa quello ciao".split(" "),
  Portuguese: "o de a e que do da em um para é com não uma os no se na por mais as dos como mas foi ao ele das tem à seu sua ou ser quando muito há nos já está eu também só pelo pela até isso ela entre era depois sem mesmo aos ter seus quem você obrigado olá".split(" "),
};

const charHints = {
  Spanish: /[ñ¿¡]/g,
  French: /[çèêëîïœû]/g,
  German: /[ßäöü]/g,
  Portuguese: /[ãõ]/g,
  Italian: /[ìò]/g,
};

const ALPHA = 1;
const models = Object.fromEntries(
  Object.entries(vocab).map(([lang, words]) => [lang, new Set(words)])
);
const V = new Set(Object.values(vocab).flat()).size;

export const languages = Object.keys(vocab);

export function identify(text) {
  const clean = text.toLowerCase().trim();
  if (!clean) return null;

  const tokens = clean.match(/[\p{L}']+/gu) || [];
  const devanagari = (clean.match(/[ऀ-ॿ]/g) || []).length;
  const letters = (clean.match(/\p{L}/gu) || []).length || 1;

  let matched = 0;
  const logScores = {};

  for (const [lang, words] of Object.entries(models)) {
    const denom = Math.log(words.size + ALPHA * V);
    let score = 0;
    for (const t of tokens) {
      const hit = words.has(t);
      if (hit) matched++;
      score += Math.log((hit ? 1 : 0) + ALPHA) - denom;
    }
    const hint = charHints[lang];
    if (hint) score += 2 * (clean.match(hint) || []).length;
    logScores[lang] = score;
  }

  // Script is a very strong signal: Devanagari text is Hindi, Latin text is not.
  const devRatio = devanagari / letters;
  logScores.Hindi += devRatio > 0.5 ? 50 : -50;
  if (devRatio > 0.5) for (const l of languages) if (l !== "Hindi") logScores[l] -= 50;

  const hasCharHint = Object.values(charHints).some((r) => (clean.match(r) || []).length);
  if (!matched && !hasCharHint && devRatio <= 0.5) return { unsure: true, ranking: [] };

  const max = Math.max(...Object.values(logScores));
  const exp = Object.entries(logScores).map(([l, s]) => [l, Math.exp(s - max)]);
  const total = exp.reduce((sum, [, v]) => sum + v, 0);
  const ranking = exp
    .map(([lang, v]) => ({ lang, p: v / total }))
    .sort((a, b) => b.p - a.p);

  return { unsure: false, ranking, tokens: tokens.length };
}
