import React, {useEffect, useState} from 'react';
import './App.css';
import {Board} from "./models/Board";
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardComponent from "./components/board-component/BoardComponent";
import PlayerAndFigures from "./components/lost-figures/PlayerAndFigures";
import Timer from "./components/timer/Timer";
import Moves from "./components/moves/Moves";
import {Colors} from "./models/Colors";
import {Cell} from "./models/Cell";
import NewGameModal from "./components/modals/new-game-modal/NewGameModal";
import GameOverModal from "./components/modals/game-over-modal/GameOverModal";
import PromotePawnModal from "./components/modals/promote-pawn-modal/PromotePawnModal";

function App() {

    const [board, setBoard] = useState(new Board());
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [whiteName, setWhiteName] = useState('White');
    const [blackName, setBlackName] = useState('Black');
    const [modalNewGame, setModalNewGame] = useState(false);
    const [modalGameOver, setModalGameOver] = useState(false);
    const [modalPromotePawn, setModalPromotePawn] = useState(false);
    const [blackTimer, setBlackTimer] = useState<number | null>(null);
    const [whiteTimer, setWhiteTimer] = useState<number | null>(null);

    function restart(timer: number | null, newWhiteName: string, newBlackName: string) {
        if ((timer === null || (timer > 0 && timer <= 10000)) &&
            newWhiteName !== '' && newWhiteName.length <= 50 &&
            newBlackName !== '' && newBlackName.length <= 50) {
            setBlackTimer(timer);
            setWhiteTimer(timer);
            setWhiteName(newWhiteName);
            setBlackName(newBlackName);
            setModalNewGame(false);
            const newBoard = new Board();
            newBoard.initCells();
            newBoard.addFigures();
            setBoard(newBoard);
            setSelectedCell(null);
        }
    }

    useEffect(() => {
        setModalNewGame(true);
    }, []);

    return (
        <div className="app">

            <NewGameModal modalNewGame={modalNewGame}
                          restart={restart}
            />

            <GameOverModal board={board}
                           setModalNewGame={setModalNewGame}
                           modalGameOver={modalGameOver}
                           setModalGameOver={setModalGameOver}
                           whiteName={whiteName}
                           blackName={blackName}
                           whiteTimer={whiteTimer}
                           blackTimer={blackTimer}
            />

            <PromotePawnModal
                board={board}
                modalPromotePawn={modalPromotePawn}
                setModalPromotePawn={setModalPromotePawn}
            />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-9 col-lg-5 my-1">
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
                            blackTimer={blackTimer}
                            whiteTimer={whiteTimer}
                        />
                        <PlayerAndFigures
                            playerName={whiteName}
                            figures={board.lostBlackFigures}
                            playerColor={Colors.WHITE}
                            currentPlayer={board.currentPlayer}
                        />
                    </div>
                    <div
                        className="col-12 col-sm-6 col-lg-3 order-lg-first d-flex justify-content-center align-items-center">
                        <Timer
                            blackTimer={blackTimer}
                            setBlackTimer={setBlackTimer}
                            whiteTimer={whiteTimer}
                            setWhiteTimer={setWhiteTimer}
                            blackName={blackName}
                            whiteName={whiteName}
                            currentPlayer={board.currentPlayer}
                            setModalNewGame={setModalNewGame}
                            setModalGameOver={setModalGameOver}
                        />
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center align-items-center">
                        <Moves whiteMoves={board.whiteMoves} blackMoves={board.blackMoves}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
