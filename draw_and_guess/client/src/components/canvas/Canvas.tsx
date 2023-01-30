import { useCallback, useEffect, useRef, useState } from "react";
import drawLine from "../../utils/drawLine";
import { socketContext } from "../../app/gamesSlice";
import { useAppSelector } from "../../app/hooks";
import Button from "../form/Button";
import { username } from "../../app/gamesSlice";
import EVENTS from "../../config/events";
import { Coordinate, CanvasPaintProps } from "../../utils/interfaces";
import { useParams } from "react-router-dom";

const Canvas = ({
  width,
  height,
  lineJoin,
  lineWidth,
  strokeColor,
  word,
}: CanvasPaintProps) => {
  const currentUser = useAppSelector(username);
  const socket = useAppSelector(socketContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  const { id } = useParams();

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousedown", startPaint);
    return () => {
      canvas.removeEventListener("mousedown", startPaint);
    };
  }, [startPaint]);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine({
            originalMousePosition: mousePosition,
            newMousePosition,
            ref: canvasRef,
            lineWidth,
            lineJoin,
            strokeColor,
          });
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, lineJoin, lineWidth, mousePosition, strokeColor]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mousemove", paint);
    return () => {
      canvas.removeEventListener("mousemove", paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener("mouseup", exitPaint);
    canvas.addEventListener("mouseleave", exitPaint);
    return () => {
      canvas.removeEventListener("mouseup", exitPaint);
      canvas.removeEventListener("mouseleave", exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };
  return (
    <div>
      <div style={{ width: "50vw", height: "50vh", border: "red 10px solid" }}>
        <canvas ref={canvasRef} height={height} width={width} />
      </div>
      <Button
        onClick={() => {
          if (canvasRef && canvasRef.current && socket) {
            socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {
              content: canvasRef.current.toDataURL("image/png", 1.0),
              contentType: "image",
              username: currentUser,
              roomId: id,
              word,
            });
          }
        }}
        padding="7px"
        bold
        
      >
        Send draw
      </Button>
    </div>
  );
};

Canvas.defaultProps = {
  width: window.innerWidth * 0.5,
  height: window.innerHeight * 0.5,
};

export default Canvas;
