import styled from "@emotion/styled";

//reusable media query
const sm = "@media (width <= 600px)";

const Div = styled.div({
  display: "flex",
  gap: ".25em",
  fontSize: "4rem",
  [sm]: {
    fontSize: "2rem",
  },
  fontWeight: "bold",
  textTransform: "uppercase",
});

const Letters = styled.span({
  borderBottom: ".1em solid black",
});

const Letter = styled.span<{ show: boolean }>(
  {
    display: "block",
    width: 58,
    [sm]: {
      width: 30,
    },
    textAlign: "center",
  },
  (props) => ({
    visibility: props.show ? "visible" : "hidden",
    color: props.color,
  })
);

type HangmanWordProps = {
  guessedLetters: string[];
  answer: string;
  reveal?: boolean;
};

export default function HangmanWord({
  guessedLetters,
  answer,
  reveal = false,
}: HangmanWordProps) {
  return (
    <Div>
      {answer.split("").map((letter, index) => (
        <Letters key={index}>
          <Letter
            show={guessedLetters.includes(letter) || reveal}
            color={!guessedLetters.includes(letter) && reveal ? "red" : "black"}
          >
            {letter}
          </Letter>
        </Letters>
      ))}
    </Div>
  );
}
