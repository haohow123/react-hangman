import styled from "@emotion/styled";
import { useMachine } from "@xstate/react";
import { useCallback, useEffect } from "react";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

import wordMachine, { MACHINE_EVENT, MACHINE_STATE } from "./wordMachine";

const Div = styled.div({
  maxWidth: "800px",
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  margin: "0 auto",
  alignItems: "center",
});

const ResultDiv = styled.div({
  fontSize: "2rem",
  textAlign: "center",
});

function App() {
  const [current, send] = useMachine(wordMachine);

  const incorrectLetters = current.context.guessedLetters.filter(
    (letter) => !current.context.word.includes(letter)
  );

  const isLoser = current.matches(MACHINE_STATE.FAIL);
  const isWinner = current.matches(MACHINE_STATE.SUCCESS);

  const addGuessLetter = useCallback(
    (letter: string) => {
      if (
        current.context.guessedLetters.includes(letter) ||
        isLoser ||
        isWinner
      )
        return;

      send({ type: MACHINE_EVENT.GUESS_LETTER, value: letter });
    },
    [current.context.guessedLetters, send]
  );

  //keypress effect
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLocaleLowerCase();
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessLetter(key);
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessLetter]);

  const resetGame = useCallback(() => {
    send(MACHINE_EVENT.RESET);
  }, [current, send]);

  //reset keypress effect
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (key !== "Enter") return;

      e.preventDefault();
      resetGame();
    };
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [resetGame]);

  return (
    <Div>
      <ResultDiv>
        {isWinner && "Winner ! - Press Enter or Refresh to try again"}
        {isLoser && "Nice Try ! - Press Enter or Refresh to try again"}
      </ResultDiv>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={current.context.guessedLetters}
        answer={current.context.word}
      />
      <Keyboard
        disabled={isWinner || isLoser}
        activeLetters={current.context.guessedLetters.filter((letter) =>
          current.context.word.includes(letter)
        )}
        inactiveLetters={incorrectLetters}
        addGuessLetter={addGuessLetter}
      />
    </Div>
  );
}

export default App;
