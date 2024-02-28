import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { getBlackName, getWhiteName } from '../../../store/model/players/playersSelectors';
import { getBlackTimer, getTimeMoment, getWhiteTimer } from '../../../store/model/timers/timersSelectors';
import TimerRow from './timer-row/TimerRow';
import { useTimer } from './useTimer';
import type { Dispatch, FC, SetStateAction } from 'react';

export interface TimersProps {
    setIsTimerVisible: (isVisible: boolean) => void;
    isTimerRunning: boolean;
    setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}

const Timers: FC<TimersProps> = ({ setIsTimerVisible, isTimerRunning, setIsTimerRunning }) => {

    const { board } = useContext(BoardContext);
    const { getCurrentPlayerColor: currentPlayerColor } = board;
    const blackTimer = useSelector(getBlackTimer);
    const whiteTimer = useSelector(getWhiteTimer);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timeMoment = useSelector(getTimeMoment);

    const { timer, timerCheck, startTimer } = useTimer({
        isTimerRunning,
        setIsTimerRunning,
        setIsTimerVisible,
    });

    useEffect(() => {
        startTimer();
        const currentTimer = timer.current;

        return () => {
            if (currentTimer) {
                clearInterval(currentTimer);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlayerColor, isTimerRunning]);

    useEffect(() => {
        timerCheck();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [blackTimer, whiteTimer, currentPlayerColor]);

    return (
        <div className="timer" >
            <div className={`d-flex flex-column ${timeMoment ? 'align-items-end' : 'align-items-center'}`} >
                <TimerRow name={blackName} timer={blackTimer} />
                <TimerRow name={whiteName} timer={whiteTimer} />
            </div >
        </div >
    );
};

export default Timers;
