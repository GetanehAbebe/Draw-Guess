import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setRoomId, setRooms, socketContext } from "../app/gamesSlice";
import Canvas from "../components/CanvasContext";
import GameStarter from "../components/GameStarter";
import EVENTS from "../config/events";
import { addMessage } from "../app/gamesSlice";
import { Message } from "../utils/interfaces";
import { useParams } from "react-router-dom";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import Flex from "../components/Flex";

const WordGuess = ({ img, wordLength }: any) => {
  const socket = useAppSelector(socketContext);
  const [guessedWord, setGuessedWord] = useState("");
  const { id } = useParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (wordLength >= e.target.value.length) {
      setGuessedWord(e.target.value);
    }

    // TODO: find a way to alert for user
    // else {
    //   alert("Note: Your input's length is longer than Draw's word");
    // }
  };

  // useEffect(() => {
  //   socket.on(EVENTS.SERVER.RIGHT_GUESS, () => {
  //     alert("right Guess");
  //   });
  //   socket.on(EVENTS.SERVER.BAD_GUESS, () => {
  //     alert("Wrong Guess");
  //   });
  // }, [socket]);

  return (
    <Flex direction="column">
      Please try guess this Draw.
      <div>clue : The word Length is : {wordLength}</div>
      <div>
        <img src={img} alt="" />
      </div>
      <Flex direction="column" width="50%">
        <Input
          onChange={handleChange}
          name="Guess Word"
          label="Guess Word: "
          type="text"
          value={guessedWord}
        />
        <Button
          disabled={wordLength !== guessedWord.length}
          onClick={() => {
            socket.emit(EVENTS.CLIENT.SEND_GUESS, {
              roomId: id,
              word: guessedWord,
            });
          }}
          padding="5px"
          bold
          fontSize="26px"
          backgroundColor={wordLength !== guessedWord.length ? "gray" : "cyan"}
        >
          Send guess
        </Button>
      </Flex>
    </Flex>
  );
};

const Room = () => {
  const { id } = useParams();
  const [word, setWord] = useState("");
  const [showCanvas, setShowCanvas] = useState(false);
  const dispatch = useAppDispatch();
  const socket = useAppSelector(socketContext);
  const stamMessages = useAppSelector(
    (state) => state.games.rooms[`${id}`].messages
  );
  const [showForm, setShowForm] = useState(!!stamMessages.length);
  const onStartButtonClicked = (text: string) => {
    setShowCanvas(true);
  };
  useEffect(() => {
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, id);
    socket.on(
      EVENTS.SERVER.ROOM_MESSAGE,
      ({
        roomId,
        content,
        username,
        contentType,
        sendTime,
        messageId,
        wordLength,
      }: Message) => {
        const date = new Date();
        const receiveTime = `${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}`;
        dispatch(
          addMessage({
            roomId,
            content,
            username,
            contentType,
            sendTime,
            receiveTime,
            wordLength,
            messageId,
          })
        );
      }
    );
    socket.on(EVENTS.SERVER.RIGHT_GUESS, () => {
      alert("right Guess");
    });
    socket.on(EVENTS.SERVER.BAD_GUESS, () => {
      alert("Wrong Guess");
    });
  }, []);

  const updateRooms = (data: any) => {
    dispatch(setRooms(data));
  };

  const updateRoomId = () => {
    dispatch(setRoomId(id));
  };
  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOMS, (data: any) => {
      updateRooms(data);
    });
    socket.on(EVENTS.SERVER.JOINED_ROOM, () => {
      updateRoomId();
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div>
      {!stamMessages && (
        <Button onClick={() => setShowForm(!showForm)}>Create new Task</Button>
      )}
      {!stamMessages.length && (
        <div>
          {!showForm && (
            <GameStarter
              onClick={onStartButtonClicked}
              onWordGenerated={(val: string) => {
                setWord(val);
              }}
            />
          )}
          {showCanvas && <Canvas word={word} />}
        </div>
      )}
      {/* {!showForm && <GameStarter />} */}
      {stamMessages.length === 1 ? (
        <>
          <WordGuess
            handleChange={handleChange}
            img={stamMessages[0].content}
            wordLength={stamMessages[0].wordLength}
          />
        </>
      ) : null}
    </div>
  );
};

export default Room;
