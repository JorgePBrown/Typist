import { Match, createEffect, createResource, createSignal } from "solid-js";
import "./App.css";
import Word from "./components/Word";
import TypedArea from "./components/TypedArea";
import WordCounter from "./components/WordCounter";

const Mode = {
  RANDOM: 0,
  QUOTES: 1,
};

function App() {
  const [mode, setMode] = createSignal(undefined);

  return (
    <Switch>
      <Match when={mode() === undefined}>
        <button onClick={() => setMode(Mode.RANDOM)}>Random</button>
        <button onClick={() => setMode(Mode.QUOTES)}>Quotes</button>
      </Match>
      <Match when={mode() === Mode.RANDOM}>
        <button onClick={() => setMode(undefined)}>Back</button>
        <RandomWords />
      </Match>
      <Match when={mode() === Mode.QUOTES}>
        <button onClick={() => setMode(undefined)}>Back</button>
        <Quotes />
      </Match>
    </Switch>
  );
}

function RandomWords() {
  const [words] = createResource(() =>
    fetch("./common-words.json").then((res) => res.json()),
  );

  return (
    <Show when={!words.loading} fallback={<div>Loading...</div>}>
      <Word words={words()} />
    </Show>
  );
}

function Quotes() {
  const [quote, { refetch }] = createResource(() =>
    fetch("https://api.api-ninjas.com/v1/quotes", { headers: { "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY }}).then((res) => res.json()),
  );

  document.addEventListener("wordtyped", refetch)

  return (
    <Show when={!quote.loading} fallback={<div>Loading...</div>}>
      <WordCounter/>
      <TypedArea word={quote()[0].quote}/>
      <p>Author: {quote()[0].author}</p>
    </Show>
  );
}

export default App;
