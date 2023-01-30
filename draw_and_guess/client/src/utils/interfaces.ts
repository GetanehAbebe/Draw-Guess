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
  wordLength?: number;
}

export interface Room {
  name: string;
  messages: Message[];
  roomId: string;
  createTime: string;
  wordLength?: string;
}

export const Rooms: Record<string, Room> = {};

export interface CanvasSizeProps {
  width: number;
  height: number;
  word?: string;
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
  word?: string;
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

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  backgroundColor?: string;
  color?: string;
  cursor?: string;
  width?: string;
  height?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  bold?: boolean;
  fontSize?: string;
}

export interface FlexProps {
  justifyContent?: string;
  direction?: string;
  wrap?: string;
  grow?: number;
  flow?: string;
  shrink?: number;
  basis?: string;
  order?: string;
  flex?: string;
  children?: any;
  width?: string;
  height?: string;
}

export interface SocketState {
  rooms: Record<string, Room>;
  username?: string | null;
  userId?: string | null;
  roomId: string;
  socket: Socket;
}

export interface User {
  firstName: string;
  lastName: string;
  nickName?: string;
}
