import React, {useEffect, useState} from 'react';
import './App.css';
import {Board} from "./models/Board";
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardComponent from "./components/board-component/BoardComponent";
import PlayerAndFigures from "./components/player-and-figures/PlayerAndFigures";
import Timer from "./components/timer/Timer";
import Moves from "./components/moves/Moves";
import {Colors} from "./models/Colors";
import {Cell} from "./models/Cell";
import NewGameModal from "./components/modals/new-game-modal/NewGameModal";
import GameOverModal from "./components/modals/game-over-modal/GameOverModal";
import PromotePawnModal from "./components/modals/promote-pawn-modal/PromotePawnModal";
import {nameSymbolsLimit, secondsLimit} from "./utils/constants";

function App() {

    const [board, setBoard] = useState(new Board());
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [whiteName, setWhiteName] = useState('White');
    const [blackName, setBlackName] = useState('Black');
    const [modalNewGame, setModalNewGame] = useState(true);
    const [modalGameOver, setModalGameOver] = useState(false);
    const [modalPromotePawn, setModalPromotePawn] = useState(false);
    const [seconds, setSeconds] = useState<number | null>(300);
    const [timeWinner, setTimeWinner] = useState<string | null>(null);

    function gameSettings(timer: number | null, newWhiteName: string, newBlackName: string) {
        setSeconds(timer);
        setTimeWinner(null);
        setWhiteName(newWhiteName);
        setBlackName(newBlackName);
        setModalNewGame(false);
    }

    function boardSettings() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setBoard(newBoard);
        setSelectedCell(null);
    }

    function start(timer: number | null, newWhiteName: string, newBlackName: string) {
        if ((timer === null || (timer > 0 && timer <= secondsLimit)) &&
            newWhiteName !== '' && newWhiteName.length <= nameSymbolsLimit &&
            newBlackName !== '' && newBlackName.length <= nameSymbolsLimit) {
            gameSettings(timer, newWhiteName, newBlackName)
            boardSettings();
        }
    }

    return (
        <div className="app">

            <NewGameModal modalNewGame={modalNewGame}
                          start={start}
            />

            <GameOverModal board={board}
                           setModalNewGame={setModalNewGame}
                           modalGameOver={modalGameOver}
                           setModalGameOver={setModalGameOver}
                           whiteName={whiteName}
                           blackName={blackName}
                           timeWinner={timeWinner}
            />

            <PromotePawnModal
                board={board}
                modalPromotePawn={modalPromotePawn}
                setModalPromotePawn={setModalPromotePawn}
            />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-lg-5 my-1">
                        <PlayerAndFigures
                            playerName={blackName}
                            figures={board.lostWhiteFigures}
                            playerColor={Colors.BLACK}
                            currentPlayer={board.currentPlayer}
                        />
                        <BoardComponent
                            board={board}
                            selectedCell={selectedCell}
                            setSelectedCell={setSelectedCell}
                            setModalGameOver={setModalGameOver}
                            setModalPromotePawn={setModalPromotePawn}
                            timeWinner={timeWinner}
                        />
                        <PlayerAndFigures
                            playerName={whiteName}
                            figures={board.lostBlackFigures}
                            playerColor={Colors.WHITE}
                            currentPlayer={board.currentPlayer}
                        />
                    </div>
                    <div
                        className="col-12 col-sm-5 col-lg-3 order-lg-first
                        d-flex justify-content-center align-items-center">
                        <Timer
                            board={board}
                            seconds={seconds}
                            setSeconds={setSeconds}
                            setTimeWinner={setTimeWinner}
                            blackName={blackName}
                            whiteName={whiteName}
                            setModalNewGame={setModalNewGame}
                            setModalGameOver={setModalGameOver}
                        />
                    </div>
                    <div className="col-12 col-sm-5 col-lg-3
                    d-flex justify-content-center align-items-center">
                        <Moves whiteMoves={board.whiteMoves} blackMoves={board.blackMoves}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
