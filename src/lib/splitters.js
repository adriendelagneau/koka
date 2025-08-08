// utils/splitters.js

const splitLetters = (word, refs) => {
  return word.split("").map((letter, i) => (
    <span
    key={i}
    ref={el => el && refs.current.push(el)}
    className="opacity-0"
    >
      {letter}
    </span>
  ));
};

export const splitWords = (phrase, refs) => {
  return phrase.split(" ").map((word, i) => (
    <p key={i} className="inline-block ">
      {splitLetters(word, refs)}
    </p>
  ));
};
