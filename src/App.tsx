import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { BoardContext } from './board-context/board/BoardContext';
import { Colors } from './chess-model';
import BoardComponent from './components/board-component/BoardComponent';
import GameOverModal from './components/modals/game-over/GameOverModal';
import NewGameModal from './components/modals/new-game/NewGameModal';
import PromotePawnModal from './components/modals/promote-pawn/PromotePawnModal';
import Moves from './components/moves/Moves';
import PlayerAndFigures from './components/player-and-figures/PlayerAndFigures';
import TimersAndSettings from './components/timers-and-settings/TimersAndSettings';
import { getBlackName, getWhiteName } from './store/model/players/playersSelectors';

const App = () => {

    const { board } = useContext(BoardContext);
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
                        <TimersAndSettings/>
                    </div>
                    <div className="col-12 col-sm-5 col-lg-3
                                    d-flex justify-content-center align-items-center">
                        <Moves/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
