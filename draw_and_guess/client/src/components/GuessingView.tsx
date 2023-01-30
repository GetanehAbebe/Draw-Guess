import React, { useState, useEffect } from "react";
import Flex from "./Flex";

interface Props {
  drawing: string;
}

const GuessingView: React.FC<Props> = ({ drawing }) => {
  const [guess, setGuess] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  return (
    <Flex direction="column">
      <h2>Guess the word:</h2>
      <img
        src={imgUrl}
        alt="drawing"
        style={{
          width: window.innerWidth,
          height: window.innerHeight,
          border: "blue 10px solid",
        }}
      />
    </Flex>
  );
};

export default GuessingView;
