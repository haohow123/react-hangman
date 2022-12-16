import styled from "@emotion/styled";

const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const Div = styled.div({
  alignSelf: "stretch",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
  gap: ".5rem",
});

const Button = styled.button({
  width: "100%",
  border: "3px solid black",
  background: "none",
  aspectRatio: "1/1",
  fontSize: "2.5rem",
  textTransformation: "uppercase",
  padding: ".5rem",
  fontWeight: "bold",
  cursor: "pointer",
  color: "black",
  "&:disabled": {
    cursor: "not-allowed",
  },
  "&:hover:not(:disabled), :focus:not(:disabled)": {
    backgroundColor: "hsl(200, 100%,75%)",
  },
  "&.active": {
    backgroundColor: "hsl(200,100%,50%)",
    color: "white",
  },
  "&.inactive": {
    opacity: 0.3,
  },
});

export default function Keyboard() {
  return (
    <Div>
      {KEYS.map((key) => (
        <Button key={key}>{key}</Button>
      ))}
    </Div>
  );
}
