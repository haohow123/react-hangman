import { createMachine, assign } from "xstate";
import words from "./wordList.json";

export enum MACHINE_STATE {
  CLEAN = "CLEAN",
  DIRTY = "DIRTY",
  SUCCESS = "SUCCESS",
  FAIL = "FAIL",
}

export enum MACHINE_EVENT {
  GUESS_LETTER = "GUESS_LETTER",
  RESET = "RESET",
}

const getWord = () => words[Math.floor(Math.random() * words.length)];
const wordMachine = createMachine<{ word: string; guessedLetters: string[] }>(
  {
    //https://xstate.js.org/docs/guides/actions.html
    predictableActionArguments: true,
    id: "word",
    //initial state: "clean"
    initial: MACHINE_STATE.CLEAN,
    //initial context
    context: {
      word: getWord(),
      guessedLetters: [],
    },
    states: {
      [MACHINE_STATE.CLEAN]: {
        on: {
          [MACHINE_EVENT.GUESS_LETTER]: {
            target: MACHINE_STATE.DIRTY,
            actions: [MACHINE_EVENT.GUESS_LETTER],
          },
        },
      },
      [MACHINE_STATE.DIRTY]: {
        on: {
          [MACHINE_EVENT.GUESS_LETTER]: [
            {
              target: MACHINE_STATE.SUCCESS,
              actions: [MACHINE_EVENT.GUESS_LETTER],
              cond: "isWinner",
            },
            {
              target: MACHINE_STATE.FAIL,
              actions: [MACHINE_EVENT.GUESS_LETTER],
              cond: "isLoser",
            },
            {
              actions: [MACHINE_EVENT.GUESS_LETTER],
            },
          ],
        },
      },
      [MACHINE_STATE.SUCCESS]: {
        on: {
          [MACHINE_EVENT.RESET]: {
            target: MACHINE_STATE.CLEAN,
            actions: [MACHINE_EVENT.RESET],
          },
        },
      },
      [MACHINE_STATE.FAIL]: {
        on: {
          [MACHINE_EVENT.RESET]: {
            target: MACHINE_STATE.CLEAN,
            actions: [MACHINE_EVENT.RESET],
          },
        },
      },
    },
  },
  {
    actions: {
      [MACHINE_EVENT.GUESS_LETTER]: assign({
        guessedLetters: (context, event) => [
          ...context.guessedLetters,
          event.value,
        ],
      }),
      [MACHINE_EVENT.RESET]: assign({
        guessedLetters: () => [] as string[],
        word: () => getWord(),
      }),
    },
    guards: {
      isWinner: (context, event) =>
        context.word
          .split("")
          .every((letter) =>
            [...context.guessedLetters, event.value].includes(letter)
          ),
      isLoser: (context, event) =>
        [...context.guessedLetters, event.value].filter(
          (letter) => !context.word.includes(letter)
        ).length >= 6,
    },
  }
);

export default wordMachine;
