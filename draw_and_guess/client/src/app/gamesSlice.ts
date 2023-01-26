import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { SOCKET_URL } from '../config';
import io,{Socket} from 'socket.io-client';

export interface SocketState {
  rooms?:any,
  username?:string | null,
  userId?:string | null,
  roomId?:string
  socket: Socket
}

const socket = io(SOCKET_URL)
const initialState: SocketState = {
  username: localStorage.getItem("username"),
  socket,
 rooms:{1:{name:'roomName2', messages:[{content:'hello', author:'getaneh', date:'today'}]}},
};




export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addMessage: (state:RootState,{roomId, message}:any) => {
      state.rooms={...state.rooms,1:{name:'roomName1', messages:[{content:'hello', author:'getaneh', date:'today'}]}, 2:{name:'roomName1', messages:[{content:'hello', author:'getaneh', date:'today'}]}};
    },
    setRooms:(state:RootState,{payload})=>{      
         state.rooms = payload
         
    },
    setUsername:(state:RootState,{payload})=>{
      if(payload){
        state.username = payload
        localStorage.setItem("username", payload)
      }
    },
    setUserId:(state:RootState,{payload})=>{
      if(payload){
        state.userId = payload
        localStorage.setItem("userId", payload)
      }
    },
    setRoomId:(state:RootState,{payload})=>{
      if(payload){
        state.roomId = payload
        if(!state.rooms[payload].messages) {
          state.rooms[payload].messages = []
        }
      }
    }
  }
  
});
export const rooms = (state: RootState) => state.games.rooms;
export const username = (state:RootState)=>state.games.username;
export const userId = (state:RootState)=>state.games.userId;
export const roomId = (state:RootState)=>state.games.roomId;
export const socketContext = (state:RootState)=>state.games.socket;

export const {addMessage, setRooms,setUsername, setUserId , setRoomId } = gamesSlice.actions;




export default gamesSlice.reducer;
