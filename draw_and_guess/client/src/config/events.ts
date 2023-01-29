const EVENTS = {
  connection: "connection",
  CLIENT: {
    CREATE_ROOM: "CREATE_ROOM",
    SEND_ROOM_MESSAGE: "SEND_ROOM_MESSAGE",
    JOIN_ROOM: "JOIN_ROOM",
    SEND_GUESS: "SEND_GUESS",
    ADD_POINTS: "ADD_POINTS"
  },
  SERVER: {
    ROOMS: "ROOMS",
    JOINED_ROOM: "JOINED_ROOM",
    ROOM_MESSAGE: "ROOM_MESSAGE",
    BAD_GUESS: "BAD_GUESS",
    RIGHT_GUESS: "RIGHT_GUESS",
  },
};

export default EVENTS;
