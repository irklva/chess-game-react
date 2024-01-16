import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModalNewGame } from '../../store/model/modal/modalsSlice';
import { setTimers } from '../../store/model/timers/timersSlice';
import AppButton from '../ui/button/AppButton';
import Timer from './timer/Timer';
import st from './timer-and-btns.module.css';
import type { FC } from 'react';

const TimerAndBtns: FC = () => {

    const dispatch = useDispatch();
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const newGame = () => {
        dispatch(setModalNewGame(true));
        setIsTimerRunning(false);
    };

    const infiniteSeconds = () => {
        dispatch(setTimers({
            blackTimer: null,
            whiteTimer: null
        }));
    };

    return (
        <div className={st.timer_and_names_block}>
            <AppButton onClick={newGame}>New game</AppButton>
            <Timer
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
            />
            {isTimerRunning &&
                <AppButton onClick={infiniteSeconds}>Infinite timers</AppButton>
            }
        </div>
    );
};

export default TimerAndBtns;
