import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { rooms, setRoomId, setRooms, socketContext } from "../app/gamesSlice";
import Canvas from "../components/CanvasContext";
import { roomId } from "../app/gamesSlice";
import GameStarter from "../components/GameStarter";
import EVENTS from "../config/events";
import { addMessage } from "../app/gamesSlice";
import { Message } from "../utils/interfaces";
import { useParams } from "react-router-dom";
import Input from "../components/form/Input";

const WordGuess = ({ img, wordLength }: any) => {
  const socket = useAppSelector(socketContext);
  const [guessedWord, setGuessedWord] = useState("");
  const currentRoom = useState(useAppSelector(roomId));
  const { id: currentRoomId } = useParams();
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
    <div>
      Please try guess this Draw.
      <div>clue : The word Length is : {wordLength}</div>
      <div>
        <img src={img} alt="" />
      </div>
      <Input
        onChange={handleChange}
        name="Guess Word"
        label="Guess Word "
        type="text"
        value={guessedWord}
      />
      <button
        disabled={wordLength !== guessedWord.length}
        onClick={() => {
          socket.emit(EVENTS.CLIENT.SEND_GUESS, {
            roomId: currentRoomId,
            word: guessedWord,
          });
        }}
      >
        Guess
      </button>
    </div>
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
  console.log("word: room ", word);
  useEffect(() => {
    // socket.emit(EVENTS.CLIENT.JOIN_ROOM, currentRoom);
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

  const updateRoomId = (id: string) => {
    dispatch(setRoomId(roomId));
  };
  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOMS, (data: any) => {
      updateRooms(data);
    });
    socket.on(EVENTS.SERVER.JOINED_ROOM, (roomId: string) => {
      updateRoomId(roomId);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div>
      {!stamMessages && (
        <button onClick={() => setShowForm(!showForm)}>Create new Task</button>
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
      {/* <Canvas /> */}
      {/* {stamMessages.map(
        (
          { contentType, content, sendTime, receiveTime, messageId }: Message,
          index: number
        ) =>
          contentType === "image" ? (
            <div key={`${messageId}-${index}`}>
              <img src={content} key={messageId} alt={contentType} />
              <div>send time: {sendTime}</div>
              <div>receiv time: {receiveTime}</div>
            </div>
          ) : null
      )} */}
    </div>
  );
};

export default Room;
