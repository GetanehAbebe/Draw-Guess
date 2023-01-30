import { ChangeEvent, useEffect, useState } from "react";
import EVENTS from "../config/events";
import Flex from "../components/Flex";
import Input from "../components/form/Input";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  rooms as socketRooms,
  setRooms,
  socketContext,
} from "../app/gamesSlice";
import { Link } from "react-router-dom";
import Button from "../components/form/Button";

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
    <Flex direction="column">
      <Flex direction="column" width="30%">
        <Input
          onChange={(e) => setRoomName(e.target.value)}
          name={"RoomNaצe"}
          label="Room name"
          placeholder="Room1"
        />

        <Button
          color="White"
          padding="5px 7px "
          onClick={() => handleCreateRoom(roomName)}
          width="50%"
        >
          Create game room
        </Button>
      </Flex>

      <Flex justifyContent="left" direction="column">
        {Object.keys(rooms) &&
          Object.keys(rooms).map((key) => {
            return (
              <div key={key}>
                <Link to={`/room/${key}`}>{rooms[key].name}</Link>
              </div>
            );
          })}
      </Flex>
    </Flex>
  );
}

export default RoomsContainer;
