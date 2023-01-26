import React, { useCallback, useEffect, useRef, useState } from 'react';
import drawLine from '../../utils/drawLine';
import { socketContext } from '../../app/gamesSlice';
import { useAppSelector } from '../../app/hooks';
import Button from '../form/Button';

interface CanvasProps {
    width: number;
    height: number;
}

interface Coordinate {
    x: number;
    y: number;
};

interface CanvasProps {
    lineWidth: number,
    strokeColor: string,
    lineJoin: CanvasLineJoin
}

const Canvas = ({ width, height, lineJoin, lineWidth, strokeColor }: CanvasProps) => {
    const socket = useAppSelector(socketContext)
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPainting, setIsPainting] = useState(false);
    const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);

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
        canvas.addEventListener('mousedown', startPaint);
        return () => {
            canvas.removeEventListener('mousedown', startPaint);
        };
    }, [startPaint]);

    const paint = useCallback(
        (event: MouseEvent) => {
            if (isPainting) {
                const newMousePosition = getCoordinates(event);
                if (mousePosition && newMousePosition) {
                    drawLine({ originalMousePosition: mousePosition, newMousePosition, ref: canvasRef, lineWidth, lineJoin, strokeColor });
                    setMousePosition(newMousePosition);
                }
            }
        },
        [isPainting, mousePosition]
    );

    useEffect(() => {
        socket.on('connection', () => {
            console.log("connnected")
        })
        return () => {
            socket.disconnect()
        }
    }, [socket])




    useEffect(() => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        canvas.addEventListener('mousemove', paint);
        return () => {
            canvas.removeEventListener('mousemove', paint);
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
        canvas.addEventListener('mouseup', exitPaint);
        canvas.addEventListener('mouseleave', exitPaint);
        return () => {
            canvas.removeEventListener('mouseup', exitPaint);
            canvas.removeEventListener('mouseleave', exitPaint);
        };
    }, [exitPaint]);

    const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
        if (!canvasRef.current) {
            return;
        }
        const canvas: HTMLCanvasElement = canvasRef.current;
        return { x: event.pageX - canvas.offsetLeft, y: event.pageY - canvas.offsetTop };
    };


    return <div>
        <div style={{ width: '50vw', height: '50vh', border: 'red 10px solid' }}>
            <canvas ref={canvasRef} height={height} width={width} />
        </div>
        <Button onClick={() => {
            if (canvasRef && canvasRef.current) {
                socket.emit('send_message', canvasRef.current.toDataURL("image/png", 1.0))
            }
        }}>
            Save
        </Button>

    </div>

};

Canvas.defaultProps = {
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.5,
};

export default Canvas;
