import React, { useState } from 'react'
import { useAppSelector } from '../app/hooks'
import { rooms } from '../app/gamesSlice'
import Canvas from '../components/CanvasContext'
import { roomId } from '../app/gamesSlice'
import GameStart from '../components/GameStart'
interface Message {
    content: string,
    author: string,
    date: string
}
interface RoomProps {
    members?: string[],
    roomId: string,
    messages?: Message[] | []
}

const WordGuess = ({ handleChange, value, img }: any) => {
    return <label htmlFor="wordGuess">
        <div>
            <img src={img} alt="" />
        </div>
        <input type="text" value={value} onChange={handleChange} />
    </label>
}

const Room = () => {
    const [word, setWord] = useState("")

    const [showForm, setShowForm] = useState(false)
    const currentRoom = useAppSelector(roomId)
    const roomsWithMessages = useAppSelector(rooms)
    if (!currentRoom) {
        return null
    }
    const messages = roomsWithMessages[currentRoom] ? roomsWithMessages[currentRoom].messages : []

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("word", word)
        setWord(e.target.value)


    }

    return (
        <div>
            {!messages && <button onClick={() => setShowForm(!showForm)}>Create new Task</button>}
            {!showForm && <GameStart />}
            {messages && messages.length === 0 ? <Canvas /> : messages && messages.length === 1 ? <WordGuess handleChange={handleChange} value={word} img={messages[0].content} /> : <div>There is no nothing</div>}
            {messages && messages.map((message: Message, index: number) => {
                return <div key={message.content + index}>{message.content}</div>
            })}
        </div>
    )
}

export default Room