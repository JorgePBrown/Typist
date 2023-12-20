import { createResource, createSignal } from "solid-js";
import "./App.css";
import Word from "./components/Word";
import WordCounter from "./components/WordCounter";

function App() {
  const [words] = createResource(() =>
    fetch("./words.json").then((res) => res.json()),
  );

  const [word, setWord] = createSignal(0);

  document.addEventListener("wordtyped", handleWordTyped);

  function handleWordTyped() {
    setWord((n) => n + 1);
  }

  const currentWord = () => words()[word()];

  return (
    <Show when={!words.loading} fallback={<div>Loading...</div>}>
      <WordCounter />
      <Word word={currentWord()} />
    </Show>
  );
}

export default App;
