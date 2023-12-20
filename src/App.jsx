import { createResource, createSignal } from "solid-js";
import "./App.css";
import Word from "./components/Word";

function App() {
  const [words] = createResource(() =>
    fetch("./words.json").then((res) => res.json()),
  );

  return (
    <Show when={!words.loading} fallback={<div>Loading...</div>}>
      <Word words={words()} />
    </Show>
  );
}

export default App;
