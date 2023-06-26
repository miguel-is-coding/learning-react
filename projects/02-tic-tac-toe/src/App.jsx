import './App.css'
import {useState} from "react"

const TURNS = {
    cross: 'x',
    circle: 'o'
}


const Cell = ({children, isSelected, updateBoard, index}) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`

    const handleClick = () => {
        updateBoard(index)
    }

    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

const WINNER_COMBOS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

function App() {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [turn, setTurn] = useState(TURNS.cross)
    const [winner, setWinner] = useState(null)

    const checkWinner = (boardToCheck) => {
        for (const combo of WINNER_COMBOS) {
            const [a, b, c] = combo
            if (
                boardToCheck[a] &&
                boardToCheck[a] === boardToCheck[b] &&
                boardToCheck[a] === boardToCheck[c]
            ) {
                return boardToCheck[a]
            }
        }
        return null
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.cross)
        setWinner(null)
    }
    const updateBoard = (index) => {
        if (board[index] || winner) {
            return
        }

        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)
        const newTurn = turn === TURNS.cross ? TURNS.circle : TURNS.cross
        setTurn(newTurn)
        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            setWinner(newWinner)
        }
    }

    return (
        <main className="board">
            <h1>Tic tac toe</h1>
            <section className="game">
                {
                    board.map((_, index) => {
                        return (
                            <Cell
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {board[index]}
                            </Cell>
                        )
                    })
                }
            </section>

            <section className="turn">
                <Cell isSelected={turn === TURNS.cross}>
                    {TURNS.cross}
                </Cell>
                <Cell isSelected={turn === TURNS.circle}>
                    {TURNS.circle}
                </Cell>
            </section>

            {
                winner !== null && (
                    <section className="winner">
                        <div className="text">
                            <h2>
                                {
                                    winner === false
                                        ? 'Empate'
                                        : 'Ganó:'
                                }
                            </h2>

                            <header className="win">
                                {winner && <Cell>{winner}</Cell>}
                            </header>

                            <footer>
                                <button onClick={resetGame}>Empezar de nuevo</button>
                            </footer>
                        </div>
                    </section>
                )
            }
        </main>
    )
}

export default App
