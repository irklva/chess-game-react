import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Colors } from './chess-model';
import BoardComponent from './components/board-component/BoardComponent';
import GameOverModal from './components/modals/game-over/GameOverModal';
import NewGameModal from './components/modals/new-game/NewGameModal';
import PromotePawnModal from './components/modals/promote-pawn/PromotePawnModal';
import Moves from './components/moves/Moves';
import PlayerAndFigures from './components/player-and-figures/PlayerAndFigures';
import TimersAndSettings from './components/timers-and-settings/TimersAndSettings';

const App = () => {

    return (
        <div className="app" >

            <NewGameModal />
            <GameOverModal />
            <PromotePawnModal />

            <div className="container" >
                <div className="row justify-content-center" >
                    <section className="col-12 col-sm-10 col-lg-5 my-1" >
                        <PlayerAndFigures
                            playerColor={Colors.BLACK}
                        />
                        <BoardComponent />
                        <PlayerAndFigures
                            playerColor={Colors.WHITE}
                        />
                    </section >
                    <section className="col-12 col-sm-5 col-lg-3 order-lg-first
                                    d-flex justify-content-center align-items-center">
                        <TimersAndSettings />
                    </section >
                    <section className="col-12 col-sm-5 col-lg-3
                                    d-flex justify-content-center align-items-center">
                        <Moves />
                    </section >
                </div >
            </div >
        </div >
    );
};

export default App;
