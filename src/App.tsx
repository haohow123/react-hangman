import styled from "@emotion/styled";
import HangmanDrawing from "./HangmanDrawing";
import HangmanWord from "./HangmanWord";
import Keyboard from "./Keyboard";

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
  return (
    <Div>
      <ResultDiv>Lost Win</ResultDiv>
      <HangmanDrawing />
      <HangmanWord />
      <Keyboard />
    </Div>
  );
}

export default App;
