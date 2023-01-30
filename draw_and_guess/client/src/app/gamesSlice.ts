import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SOCKET_URL } from "../config";
import io from "socket.io-client";
import { Message, Room, SocketState } from "../utils/interfaces";

const socket = io(SOCKET_URL);

const initialState: SocketState = {
  username: localStorage.getItem("username") || "",
  socket,
  rooms: {},
  roomId: "",
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const {
        content,
        contentType,
        sendTime,
        receiveTime,
        roomId,
        messageId,
        wordLength,
        username,
      } = action.payload;
      //
      if (state.rooms[roomId]) {
        state.rooms[roomId].messages.push({
          content,
          contentType,
          sendTime,
          receiveTime,
          messageId,
          roomId,
          username,
          wordLength,
        });
      }
      return;
    },
    setRooms: (state, action: PayloadAction<Record<string, Room>>) => {
      state.rooms = action.payload;
      return;
    },
    setUsername: (state, { payload }) => {
      if (payload) {
        state.username = payload;
        localStorage.setItem("username", payload);
      }
      return;
    },
    setUserId: (state, { payload }) => {
      if (payload) {
        state.userId = payload;
        localStorage.setItem("userId", payload);
      }
      return;
    },
    setRoomId: (state, { payload }) => {
      state.roomId = payload;
      return;
    },
  },
});
export const rooms = (state: RootState) => state.games.rooms;
export const username = (state: RootState) => state.games.username;
export const userId = (state: RootState) => state.games.userId;
export const roomId = (state: RootState) => state.games.roomId || 0;

export const socketContext = (state: RootState) => state.games.socket;

export const { addMessage, setRooms, setUsername, setUserId, setRoomId } =
  gamesSlice.actions;

export default gamesSlice.reducer;
