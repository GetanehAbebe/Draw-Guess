import React, { useState, useEffect } from "react";

interface Props {
  drawing: string;
}

const GuessingView: React.FC<Props> = ({ drawing }) => {
  const [guess, setGuess] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  return (
    <div>
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
      {/* <input type="text" onChange={handleGuessChange} value={guess} />
      <button onClick={handleSubmitClick}>Submit</button> */}
    </div>
  );
};

export default GuessingView;
