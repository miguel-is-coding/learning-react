import './App.css'
import {useState} from "react"
import confetti from "canvas-confetti"
import {Cell} from "./components/Cell.jsx";
import {TURNS} from "./constants.js";
import {checkEndGame, checkWinnerFrom} from "./logic/board.js";
import {WinnerModal} from "./components/WinnerModal.jsx";
import {resetGameStorage, saveGameToStorage} from "./logic/storage/index.js";


function App() {
    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    })
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        return turnFromStorage ?? TURNS.cross
    })
    const [winner, setWinner] = useState(null)

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.cross)
        setWinner(null)
        resetGameStorage();
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
        saveGameToStorage({board: newBoard, turn: newTurn});
        const newWinner = checkWinnerFrom(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            setWinner(false);
        }
    }

    return (
        <main className="board">
            <h1>Tic tac toe</h1>
            <button onClick={resetGame}>Reiniciar partida</button>
            <section className="game">
                {
                    board.map((cell, index) => {
                        return (
                            <Cell
                                key={index}
                                index={index}
                                updateBoard={updateBoard}
                            >
                                {cell}
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

            <WinnerModal resetGame={resetGame} winner={winner}/>
        </main>
    )
}

export default App
