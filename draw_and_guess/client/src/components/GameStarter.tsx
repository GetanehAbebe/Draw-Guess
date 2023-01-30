import { useCallback, useState } from "react";
import randomWords from "random-words";
import Button from "./form/Button";
const GameStarter = ({
  onClick,
  onWordGenerated,
}: {
  onClick: Function;
  onWordGenerated: Function;
}) => {
  const [word, setWord] = useState("");
  const [canChooseWord, setCanChooseWord] = useState(true);

  const onStartButtonClicked = () => {
    setCanChooseWord(false);
    onClick();
  };

  const fetchWord = useCallback(() => {
    const newWord = randomWords({ exactly: 1, join: "" });
    onWordGenerated(newWord);
    setWord(newWord);
    return;
  }, []);

  return (
    <div>
      {!word && <div>To Start the game, please generate word</div>}
      {word && (
        <div>
          The Chosen Word is <h1>{word}</h1>
        </div>
      )}
      {word && canChooseWord && (
        <div>click on Start button to start drawing</div>
      )}
      <div>
        {canChooseWord && (
          <Button onClick={fetchWord}>
            {word ? "Generate another Word" : "Generate Word"}
          </Button>
        )}
      </div>
      {canChooseWord && word && (
        <Button onClick={onStartButtonClicked}>Start</Button>
      )}
    </div>
  );
};

export default GameStarter;
