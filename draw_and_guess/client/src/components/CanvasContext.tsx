import React, { useRef, useState } from 'react';
import { socketContext } from '../app/gamesSlice';
import { useAppSelector } from '../app/hooks';
import Button from './form/Button';
import Canvas from './canvas/Canvas';
import Select from './form/Select';
import { COLOR_OPTIONS, LINE_JOIN_OPTIONS } from '../config';
import Input from './form/Input';
interface CanvasProps {
    width: number;
    height: number;
}


const CanvasContext = ({ width, height }: CanvasProps) => {
    const [lineWidth, setLineWidth] = useState<number>(0.5)
    const [strokeColor, setStrokeColor] = useState<string>("gdfgdfreen")
    const [lineJoin, setLineJoin] = useState<CanvasLineJoin>("miter")

    return <div>
        <form action="">
            <Select name="Color: " handleChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                setStrokeColor(e.target.value)
            }} options={COLOR_OPTIONS} id="colorPicker" />

            <Input onChange={e => { setLineWidth(+e.target.value) }} name="Line width" label='Line width: ' type="number" min={0.25} max={28} step={0.25} value={'' + lineWidth} />

            <Select name="Line Join: " handleChange={(e: { target: { value: React.SetStateAction<string>; }; }) => {
                setLineJoin(e.target.value as CanvasLineJoin)
            }} options={LINE_JOIN_OPTIONS} id="lineTypePicker" />
        </form>
        <Canvas height={height} width={width} lineJoin={lineJoin as CanvasLineJoin} strokeColor={strokeColor} lineWidth={lineWidth} />


    </div>

};

CanvasContext.defaultProps = {
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.5,
};

export default CanvasContext;
