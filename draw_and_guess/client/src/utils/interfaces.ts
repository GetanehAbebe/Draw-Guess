import React, { InputHTMLAttributes } from "react";
import { Socket } from "socket.io-client";

export interface Message {
  content: string;
  username: string;
  sendTime: string;
  roomId: string;
  receiveTime: string;
  contentType: string;
  messageId: string;
}

export interface Room {
  name: string;
  messages: Message[];
  roomId: string;
  createTime: string;
}

export const Rooms: Record<string, Room> = {};

export interface CanvasSizeProps {
  width: number;
  height: number;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface CanvasPaintProps {
  lineWidth: number;
  strokeColor: string;
  lineJoin: CanvasLineJoin;
  height?: number;
  width?: number;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  value?: string;
  label: string;
}

export interface OptionProps {
  value: string;
  name: string;
}

export interface SelectProps {
  options: OptionProps[];
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
  id: string;
  name: string;
}

export interface CanvasProps {
  width: number;
  height: number;
}

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

export interface SocketState {
  rooms?: any;
  username?: string | null;
  userId?: string | null;
  roomId?: string;
  socket: Socket;
}

export interface User {
  firstName: string;
  lastName: string;
  nickName?: string;
}
