import { createSignal } from "solid-js";

const LetterStatus = {
  CORRECT: 0,
  INCORRECT: 1,
  UNTYPED: 2,
};

export default function TypedArea(props) {
  const [typedWord, setTypedWord] = createSignal("");

  document.addEventListener("keydown", ({ key }) => handleKeyDown(key));

  function handleKeyDown(k) {
    if (k === "Backspace") {
      setTypedWord((w) => w.slice(0, w.length - 1));
    } else if (k.length === 1 && typedWord().length < props.word.length) {
      if (typedWord() + k === props.word) {
        document.dispatchEvent(new Event("wordtyped"));
        setTypedWord("");
      } else {
        setTypedWord((w) => w + k);
      }
    }
  }

  const letters = () => {
    const arr = [];
    const tWord = typedWord();
    for (let i = 0; i < props.word.length; ++i) {
      const letter = props.word[i];
      const typedLetter = tWord[i];
      const status =
        typedLetter == undefined
          ? LetterStatus.UNTYPED
          : typedLetter === letter
            ? LetterStatus.CORRECT
            : LetterStatus.INCORRECT;
      arr.push({ letter, status });
    }
    return arr;
  };

  return (
    <span className="word">
      <For each={letters()} fallback={<p>Loading...</p>}>
        {(item) => {
          const { letter, status } = item;
          if (status === LetterStatus.UNTYPED) {
            return <span className="letter bg-neutral-600">{letter}</span>;
          }
          if (status === LetterStatus.CORRECT) {
            return <span className="letter bg-green-600">{letter}</span>;
          }
          if (status === LetterStatus.INCORRECT) {
            return <span className="letter bg-red-600">{letter}</span>;
          }
        }}
      </For>
    </span>
  );
}
