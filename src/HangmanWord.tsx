import styled from "@emotion/styled";

const Div = styled.div({
  display: "flex",
  gap: ".25em",
  fontSize: "6rem",
  fontWeight: "bold",
  textTransform: "uppercase",
});

const Letters = styled.span({
  borderBottom: ".1em solid black",
});

const Letter = styled.span<{ show: boolean }>({}, (props) => ({
  visibility: props.show ? "visible" : "hidden",
}));

export default function HangmanWord() {
  const word = "test";
  const guessedLetters = ["t", "e"];
  return (
    <Div>
      {word.split("").map((letter, index) => (
        <Letters key={index}>
          <Letter show={guessedLetters.includes(letter)}>{letter}</Letter>
        </Letters>
      ))}
    </Div>
  );
}
