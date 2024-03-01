import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BoardBlock from './components/board-block/BoardBlock';
import GameOverModal from './components/modals/game-over/GameOverModal';
import NewGameModal from './components/modals/new-game/NewGameModal';
import PromotePawnModal from './components/modals/promote-pawn/PromotePawnModal';
import Moves from './components/moves/Moves';
import TimersAndSettings from './components/timers-and-settings/TimersAndSettings';

const App = () => {

    return (
        <div className="app" >

            <NewGameModal />
            <GameOverModal />
            <PromotePawnModal />

            <div className="container" >
                <div className="row d-flex gap-2 justify-content-center" >
                    <section className="col-12 col-sm-10 col-lg-5 d-flex flex-column gap-1" >
                        <BoardBlock />
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
