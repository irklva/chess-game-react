import React, {useState} from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardComponent from "./components/board-component/BoardComponent";
import TimerAndBtns from "./components/timer-and-btns/timerAndBtns";
import Moves from "./components/moves/Moves";
import NewGameModal from "./components/modals/new-game/NewGameModal";
import GameOverModal from "./components/modals/game-over/GameOverModal";
import PromotePawnModal from "./components/modals/promote-pawn/PromotePawnModal";
import PlayerAndFigures from "./components/player-and-figures/PlayerAndFigures";
import {Colors} from "./models/Colors";
import {Board} from "./models/board/Board";
import {Move} from "./models/interfaces/Move";
import {useSelector} from "react-redux";
import {getBlackName, getWhiteName} from "./store/reducers/playersSlice";
import {Cell} from "./models/cell/Cell";

function App() {
    const [board, setBoard] = useState(new Board());
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);

    const boardSettings = () => {
        const newBoard = new Board();
        newBoard.initBaseLine();
        setBoard(newBoard);
        setSelectedCell(null);
    }

    const changeBoard = (move: Move) => {
        if (move.board) {
            selectedCell?.highLightMoveCells(true);
            setSelectedCell(null);
            setBoard(move.board);
        }
    }

    return (
        <div className="app">

            <NewGameModal boardSettings={boardSettings}/>
            <GameOverModal board={board}/>
            <PromotePawnModal board={board} setSelectedCell={setSelectedCell}/>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-lg-5 my-1">
                        <PlayerAndFigures
                            playerName={blackName}
                            figures={board.getLostWhiteFigures}
                            playerColor={Colors.BLACK}
                            currentPlayerColor={board.getCurrentPlayerColor}
                        />
                        <BoardComponent
                            board={board}
                            selectedCell={selectedCell}
                            setSelectedCell={setSelectedCell}
                        />
                        <PlayerAndFigures
                            playerName={whiteName}
                            figures={board.getLostBlackFigures}
                            playerColor={Colors.WHITE}
                            currentPlayerColor={board.getCurrentPlayerColor}
                        />
                    </div>
                    <div className="col-12 col-sm-5 col-lg-3 order-lg-first
                                    d-flex justify-content-center align-items-center">
                        <TimerAndBtns
                            isMate={board.getMate}
                            isStalemate={board.getStalemate}
                            currentPlayerColor={board.getCurrentPlayerColor}
                        />
                    </div>
                    <div className="col-12 col-sm-5 col-lg-3
                                    d-flex justify-content-center align-items-center">
                        <Moves blackMoves={board.getBlackMoves}
                               whiteMoves={board.getWhiteMoves}
                               changeBoard={changeBoard}
                               boardId={board.getId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
