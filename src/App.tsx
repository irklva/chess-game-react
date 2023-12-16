import React from 'react';
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardComponent from "./components/board-component/BoardComponent";
import TimerAndBtns from "./components/timer-and-btns/timerAndBtns";
import Moves from "./components/moves/Moves";
import NewGameModal from "./components/modals/new-game/NewGameModal";
import GameOverModal from "./components/modals/game-over/GameOverModal";
import PromotePawnModal from "./components/modals/promote-pawn/PromotePawnModal";
import PlayerAndFigures from "./components/player-and-figures/PlayerAndFigures";
import {Colors} from "./models/other/Colors";
import {useSelector} from "react-redux";
import {getBlackName, getWhiteName} from "./store/reducers/playersSlice";
import {useBoard} from "./board-context/useBoard";

function App() {

    const {board} = useBoard();
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);

    return (
        <div className="app">

            <NewGameModal/>
            <GameOverModal/>
            <PromotePawnModal/>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-lg-5 my-1">
                        <PlayerAndFigures
                            playerName={blackName}
                            figures={board.getLostWhiteFigures}
                            playerColor={Colors.BLACK}
                            currentPlayerColor={board.getCurrentPlayerColor}
                        />
                        <BoardComponent/>
                        <PlayerAndFigures
                            playerName={whiteName}
                            figures={board.getLostBlackFigures}
                            playerColor={Colors.WHITE}
                            currentPlayerColor={board.getCurrentPlayerColor}
                        />
                    </div>
                    <div className="col-12 col-sm-5 col-lg-3 order-lg-first
                                    d-flex justify-content-center align-items-center">
                        <TimerAndBtns/>
                    </div>
                    <div className="col-12 col-sm-5 col-lg-3
                                    d-flex justify-content-center align-items-center">
                        <Moves/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
