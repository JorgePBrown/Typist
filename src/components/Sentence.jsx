import { For, createEffect, createSignal } from "solid-js";
import TypedArea from "./TypedArea";

export default function Sentence(props) {
  const [currentWordIdx, setCurrentWordIdx] = createSignal(0);

  document.addEventListener("wordtyped", () => {
    setCurrentWordIdx((w) => w + 1);
  });

  createEffect(() => {
    if (currentWordIdx() >= props.words.length) {
      document.dispatchEvent(new Event("sentencetyped"));
    }
  });

  const typedWords = () => props.words.slice(0, currentWordIdx());
  const currentWord = () => props.words[currentWordIdx()];
  const untypedWords = () => props.words.slice(currentWordIdx() + 1);

  return (
    <div>
      <For each={typedWords()}>
        {(item) => {
          return <p style={{ display: "inline" }}>{item}</p>;
        }}
      </For>
      <TypedArea word={currentWord()} />
      <For each={untypedWords()}>
        {(item) => {
          return <p style={{ display: "inline" }}>{item}</p>;
        }}
      </For>
    </div>
  );
}
