import { createSignal } from "solid-js";
import TypedArea from "./TypedArea";
import WordCounter from "./WordCounter";

export default function Word(props) {
  const [word, setWord] = createSignal(randomFromRange(0, props.words.length));
  const [nextWordIdx, setNextWordIdx] = createSignal(
    randomFromRange(0, props.words.length),
  );

  document.addEventListener("wordtyped", handleWordTyped);

  function handleWordTyped() {
    setWord(nextWordIdx());
    setNextWordIdx(randomFromRange(0, props.words.length));
  }

  const currentWord = () => props.words[word()];
  const nextWord = () => props.words[nextWordIdx()];

  return (
    <div>
      <WordCounter />
      <TypedArea word={currentWord()} />
      <span> {nextWord()}</span>
    </div>
  );
}

function randomFromRange(start, end) {
  if (
    end === null ||
    end === undefined ||
    start === null ||
    start === undefined
  ) {
    return 0;
  }
  return Math.floor(Math.random() * (end - start) + start);
}
