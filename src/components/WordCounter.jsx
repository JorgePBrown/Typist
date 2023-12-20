import { createSignal } from "solid-js";

export default function WordCounter() {
  const [startTime, setStartTime] = createSignal(Date.now());
  const [words, setWords] = createSignal(0);

  document.addEventListener("wordtyped", () => {
    setWords((w) => w + 1);
  });

  const speed = () => {
    const diff = Date.now() - startTime();
    const minutes = milliToMinute(diff);
    return words() === 0 ? 0 : (words() / minutes).toFixed(1);
  };

  function reset() {
    setStartTime(Date.now());
    setWords(0);
  }

  return (
    <div>
      <p>Words: {words()}</p>
      <p>Speed: {speed()}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

const ratio = 1 / (1000 * 60);
function milliToMinute(t) {
  return t * ratio;
}
