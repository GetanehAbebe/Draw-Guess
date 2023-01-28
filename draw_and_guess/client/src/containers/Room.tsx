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

const WordGuess = ({ handleChange, value, img }: any) => {
  return (
    <label htmlFor="wordGuess">
      <div>
        <img src={img} alt="" />
      </div>
      <input type="text" value={value} onChange={handleChange} />
    </label>
  );
};

const Room = () => {
  const { id } = useParams();
  const [word, setWord] = useState("");
  const dispatch = useAppDispatch();
  const [showForm, setShowForm] = useState(false);
  const socket = useAppSelector(socketContext);
  const [currentRoom, setCurrentRoom] = useState(useAppSelector(roomId));
  const allRooms = useAppSelector(rooms);
  const [messages, setMeesages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, currentRoom);

    if (!currentRoom) {
      setCurrentRoom(id);
    }
  }, []);
  useEffect(() => {
    if (currentRoom && allRooms) {
      setMeesages(allRooms[currentRoom].messages);
    }

    socket.on(
      EVENTS.SERVER.ROOM_MESSAGE,
      ({ roomId, content, username, contentType, sendTime }: Message) => {
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
            messageId: "",
          })
        );
      }
    );
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [socket]);

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

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, [socket]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
  };

  return (
    <div>
      {!messages && (
        <button onClick={() => setShowForm(!showForm)}>Create new Task</button>
      )}
      {!showForm && <GameStarter />}
      {messages.length === 0 ? (
        <Canvas />
      ) : messages.length === 1 ? (
        <WordGuess
          handleChange={handleChange}
          value={word}
          img={messages[0].content}
        />
      ) : null}

      {messages.map(
        ({ contentType, content, sendTime, receiveTime, messageId }: Message) =>
          contentType === "image" ? (
            <div>
              <img src={content} key={messageId} alt={contentType} />
              <div>send time: {sendTime}</div>
              <div>receiv time: {receiveTime}</div>
            </div>
          ) : (
            <div></div>
          )
      )}
    </div>
  );
};

export default Room;
