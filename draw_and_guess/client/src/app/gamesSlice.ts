import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { SOCKET_URL } from "../config";
import io from "socket.io-client";
import { Message, Room, SocketState } from "../utils/interfaces";

const socket = io(SOCKET_URL);

const initialState: SocketState = {
  username: localStorage.getItem("username"),
  socket,
  rooms: {},
};

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      const { content, contentType, sendTime, receiveTime, roomId, messageId } =
        action.payload;
      state.rooms[roomId].messages.push({
        content,
        contentType,
        sendTime,
        receiveTime,
        messageId,
      });
    },
    setRooms: (state, action: PayloadAction<Room[]>) => {
      state.rooms = action.payload;
    },
    setUsername: (state, { payload }) => {
      if (payload) {
        state.username = payload;
        localStorage.setItem("username", payload);
      }
    },
    setUserId: (state, { payload }) => {
      if (payload) {
        state.userId = payload;
        localStorage.setItem("userId", payload);
      }
    },
    setRoomId: (state, { payload }) => {
      state.roomId = payload;
    },
  },
});
export const rooms = (state: RootState) => state.games.rooms;
export const username = (state: RootState) => state.games.username;
export const userId = (state: RootState) => state.games.userId;
export const roomId = (state: RootState) => state.games.roomId;
export const socketContext = (state: RootState) => state.games.socket;

export const { addMessage, setRooms, setUsername, setUserId, setRoomId } =
  gamesSlice.actions;

export default gamesSlice.reducer;
