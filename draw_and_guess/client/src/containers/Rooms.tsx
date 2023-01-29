import { useEffect, useState } from "react";
import EVENTS from "../config/events";
import styles from "../styles/Room.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  rooms as socketRooms,
  setRooms,
  setRoomId,
  socketContext,
  addMessage,
} from "../app/gamesSlice";
import { Link } from "react-router-dom";
import { Message } from "../utils/interfaces";

function RoomsContainer() {
  const rooms = useAppSelector(socketRooms);
  const socket = useAppSelector(socketContext);
  const dispatch = useAppDispatch();

  const [roomName, setRoomName] = useState("");

  // useEffect(() => {
  //   window.onfocus = function () {
  //     document.title = "Chat app";
  //   };
  // }, []);

  useEffect(() => {
    socket.on(EVENTS.SERVER.ROOMS, (data: any) => {
      dispatch(setRooms(data));
    });

    // socket.on(
    //   EVENTS.SERVER.ROOM_MESSAGE,
    //   ({
    //     roomId,
    //     content,
    //     username,
    //     contentType,
    //     sendTime,
    //     messageId,
    //   }: Message) => {
    //     const date = new Date();
    //     console.log("messageId: ", messageId);
    //     const receiveTime = `${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}`;
    //     dispatch(
    //       addMessage({
    //         roomId,
    //         content,
    //         username,
    //         contentType,
    //         sendTime,
    //         receiveTime,
    //         messageId,
    //       })
    //     );
    //   }
    // );

    return () => {};
  }, []);

  function handleCreateRoom(name: string) {
    if (!String(roomName).trim()) return;

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName, messages: [] });
    // set room name input to empty string
    if (roomName) {
      setRoomName("");
    }
  }

  function handleJoinRoom(key: string) {
    socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
  }

  return (
    <nav className={styles.wrapper}>
      <div className={styles.createRoomWrapper}>
        <input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Room name"
        />
        <button className="cta" onClick={() => handleCreateRoom(roomName)}>
          Create game room
        </button>
      </div>

      <ul>
        {Object.keys(rooms) &&
          Object.keys(rooms).map((key) => {
            return (
              <div key={key}>
                {/* <div onClick={() => handleJoinRoom(key)}> */}
                <Link to={`/room/${key}`}>{rooms[key].name}</Link>
                {/* </div> */}
              </div>
            );
          })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
