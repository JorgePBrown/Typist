import { Match, createResource, createSignal } from "solid-js";
import "./App.css";
import Word from "./components/Word";

const Mode = {
  RANDOM: 0,
};

function App() {
  const [mode, setMode] = createSignal(undefined);

  return (
    <Switch>
      <Match when={mode() === undefined}>
        <button onClick={() => setMode(Mode.RANDOM)}>Random</button>
      </Match>
      <Match when={mode() === Mode.RANDOM}>
        <button onClick={() => setMode(undefined)}>Back</button>
        <RandomWords />
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

export default App;
