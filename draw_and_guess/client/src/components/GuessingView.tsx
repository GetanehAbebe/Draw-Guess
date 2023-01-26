import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import socketIOClient, { Socket } from 'socket.io-client';

interface Props {
    drawing: string;
}

const GuessingView: React.FC<Props> = ({ drawing }) => {
    const [guess, setGuess] = useState('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [imgUrl, setImgUrl] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {
        const newSocket = socketIOClient('http://localhost:5000');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('correct', () => {
                dispatch({ type: 'CORRECT_GUESS' });
            });
            socket.on('recieve_message', (data) => {
                setImgUrl(data)
            });
        }
    }, [socket, dispatch]);

    const handleGuessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGuess(e.target.value);
    };

    const handleSubmitClick = () => {
        if (socket) {
            socket.emit('guess', guess);
        }
    };

    return (
        <div>
            <h2>Guess the word:</h2>
            <img src={imgUrl} alt="drawing" style={{ width: window.innerWidth, height: window.innerHeight, border: 'blue 10px solid' }} />
            <input type="text" onChange={handleGuessChange} value={guess} />
            <button onClick={handleSubmitClick}>Submit</button>
        </div>
    );
};

export default GuessingView;
