import { v4 as uuidv4 } from "uuid";
import { Server, Socket } from "socket.io";
interface Message {
  content: string;
  date: string;
  author: string;
}
const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
    SEND_GUESS: "SEND_GUESS",
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
    BAD_GUESS: "BAD_GUESS",
    RIGHT_GUESS: "RIGHT_GUESS",
  },
};

const rooms: Record<
  string,
  { name: string; messages: Message[]; roomId: string; word: string }
> = {};

function socket({ io }: { io: Server }) {
  console.info(`Sockets enabled`);

  io.on(EVENTS.connection, (socket: Socket) => {
    console.info(`User connected ${socket.id}`);

    socket.emit(EVENTS.SERVER.ROOMS, rooms);
    socket.on("send_message", (data) => {
      socket.broadcast.emit("recieve_message", data);
    });
    /*
     * When a user creates a new room
     */
    socket.on(EVENTS.CLIENT.CREATE_ROOM, ({ roomName }) => {
      // create a roomId
      const roomId = uuidv4();
      // add a new room to the rooms object
      rooms[roomId] = {
        name: roomName,
        messages: [],
        roomId,
        word: "",
      };

      socket.join(roomId);

      // broadcast an event saying there is a new room
      socket.broadcast.emit(EVENTS.SERVER.ROOMS, rooms);

      // emit back to the room creator with all the rooms
      socket.emit(EVENTS.SERVER.ROOMS, rooms);
      // emit event back the room creator saying they have joined a room
      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });

    socket.on(
      EVENTS.CLIENT.SEND_ROOM_MESSAGE,
      ({ roomId, content, contentType, username, word = "" }) => {
        const date = new Date();
        rooms[roomId].word = word;
        socket.emit(EVENTS.SERVER.ROOM_MESSAGE, {
          roomId,
          content,
          contentType,
          username,
          messageId: uuidv4(),
          sendTime: `${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}`,
          wordLength: word.length,
        });
      }
    );

    /*
     * When a user joins a room
     */
    socket.on(EVENTS.CLIENT.JOIN_ROOM, (roomId) => {
      socket.join(roomId);

      socket.emit(EVENTS.SERVER.JOINED_ROOM, roomId);
    });

    socket.on(EVENTS.CLIENT.SEND_GUESS, ({ roomId, word }: any) => {
      if (rooms[roomId].word.toLocaleLowerCase() === word.toLocaleLowerCase()) {
        console.log("log");
        socket.emit(EVENTS.SERVER.RIGHT_GUESS, { roomId });
      } else {
        socket.emit(EVENTS.SERVER.BAD_GUESS);
      }
    });
  });
}

export default socket;
