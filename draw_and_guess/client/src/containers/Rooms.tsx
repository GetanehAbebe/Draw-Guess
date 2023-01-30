import { useEffect, useState } from "react";
import EVENTS from "../config/events";
import styles from "../styles/Room.module.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  rooms as socketRooms,
  setRooms,
  socketContext,
} from "../app/gamesSlice";
import { Link } from "react-router-dom";

function RoomsContainer() {
  const rooms = useAppSelector(socketRooms);
  const socket = useAppSelector(socketContext);
  const dispatch = useAppDispatch();

  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on(EVENTS.SERVER.ROOMS, (data: any) => {
      dispatch(setRooms(data));
    });

    return () => {};
  }, []);

  function handleCreateRoom(name: string) {
    if (!String(roomName).trim()) return;

    socket.emit(EVENTS.CLIENT.CREATE_ROOM, { roomName, messages: [] });
    if (roomName) {
      setRoomName("");
    }
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
                <Link to={`/room/${key}`}>{rooms[key].name}</Link>
              </div>
            );
          })}
      </ul>
    </nav>
  );
}

export default RoomsContainer;
