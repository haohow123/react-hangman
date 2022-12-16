import styled from "@emotion/styled";

const Div = styled.div({
  position: "relative",
});

const Ground = styled.div({
  height: "10px",
  width: "250px",
  background: "black",
});
const AlignStick = styled.div({
  height: "400px",
  width: "10px",
  background: "black",
  marginLeft: "120px",
});
const TopStick = styled.div({
  height: "10px",
  width: "200px",
  background: "black",
  marginLeft: "120px",
});
const HangStick = styled.div({
  height: "50px",
  width: "10px",
  background: "black",
  position: "absolute",
  top: 0,
  right: 0,
});

const HEAD = styled.div({
  width: "50px",
  height: "50px",
  borderRadius: "100%",
  border: "10px solid black",
  position: "absolute",
  top: "50px",
  right: "-30px",
});

const BODY = styled.div({
  width: "10px",
  height: "100px",
  background: "black",
  position: "absolute",
  top: "120px",
  right: 0,
});

const RIGHT_ARM = styled.div({
  width: "100px",
  height: "10px",
  background: "black",
  position: "absolute",
  top: "150px",
  right: "-100px",
  rotate: "-30deg",
  transformOrigin: "left bottom",
});

const LEFT_ARM = styled.div({
  width: "100px",
  height: "10px",
  background: "black",
  position: "absolute",
  top: "150px",
  right: "10px",
  rotate: "30deg",
  transformOrigin: "right bottom",
});

const RIGHT_LEG = styled.div({
  width: "100px",
  height: "10px",
  background: "black",
  position: "absolute",
  top: "210px",
  right: "-90px",
  rotate: "60deg",
  transformOrigin: "left bottom",
});

const LEFT_LEG = styled.div({
  width: "100px",
  height: "10px",
  background: "black",
  position: "absolute",
  top: "210px",
  right: 0,
  rotate: "-60deg",
  transformOrigin: "right bottom",
});

const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number;
};
export default function HangmanDrawing({
  numberOfGuesses,
}: HangmanDrawingProps) {
  return (
    <Div>
      {BODY_PARTS.slice(0, numberOfGuesses).map((BodyPart, i) => (
        <BodyPart key={i} />
      ))}
      <HangStick />
      <TopStick />
      <AlignStick />
      <Ground />
    </Div>
  );
}
