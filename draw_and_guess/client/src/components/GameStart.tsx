import { useCallback, useState } from 'react'
import randomWords from 'random-words'
const GameStart = () => {
    const [word, setWord] = useState("")
    const [canChooseWord, setCanChooseWord] = useState(true)
    const [_, setLevel] = useState('easy')

    const fetchWord = useCallback(() => {
        const newWord = randomWords({ exactly: 1, join: '' })
        setWord(newWord)
        return
    }, [])

    return (
        <div>
            <h1>
                {word}
            </h1>
            <div>
                {canChooseWord && <button onClick={fetchWord}>{word ? 'Generate another Word' : 'Generate Word'}</button>}
            </div>
            {canChooseWord && word && <button onClick={() => setCanChooseWord(false)}>Start</button>}
        </div>
    )
}

export default GameStart