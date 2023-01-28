import React from "react";

type Coordinate = {
  x: number;
  y: number;
};

interface DrawLineProps {
  originalMousePosition: Coordinate;
  newMousePosition: Coordinate;
  ref: React.RefObject<HTMLCanvasElement>;
  lineJoin: CanvasLineJoin;
  strokeColor: string;
  lineWidth: number;
}

const drawLine = ({
  ref,
  originalMousePosition,
  newMousePosition,
  lineJoin,
  strokeColor,
  lineWidth,
}: DrawLineProps) => {
  if (!ref.current) {
    return;
  }
  const canvas: HTMLCanvasElement = ref.current;
  const context = canvas.getContext("2d");

  if (context) {
    context.strokeStyle = strokeColor;
    context.lineJoin = lineJoin;
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(originalMousePosition.x, originalMousePosition.y);
    context.lineTo(newMousePosition.x, newMousePosition.y);
    context.closePath();
    context.stroke();
  }
};

export default drawLine;
