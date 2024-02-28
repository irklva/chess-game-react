import { useContext, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { setModalGameOver } from '../../../store/model/modal/modalsSlice';
import { getBlackName, getWhiteName } from '../../../store/model/players/playersSelectors';
import { getBlackTimer, getWhiteTimer } from '../../../store/model/timers/timersSelectors';
import { setTimeWinner, timerMove } from '../../../store/model/timers/timersSlice';
import { secondsDivisor } from '../../../utils/timerHelpers';
import type { TimersProps } from './Timers';
import type { Dispatch, SetStateAction } from 'react';

interface UseTimerProps extends TimersProps {
    isTimerRunning: boolean;
    setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}

export const useTimer = ({
    isTimerRunning,
    setIsTimerRunning,
    setIsTimerVisible,
}: UseTimerProps) => {
    const dispatch = useDispatch();
    const { board } = useContext(BoardContext);
    const {
        getCurrentPlayerColor: currentPlayerColor,
        getStalemate: isStalemate,
        getMate: isMate,
    } = board;
    const blackTimer = useSelector(getBlackTimer);
    const whiteTimer = useSelector(getWhiteTimer);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    const timerCheck = () => {
        if (blackTimer === 0 || whiteTimer === 0) {
            dispatch(setTimeWinner(blackTimer ? blackName : whiteName));
            dispatch(setModalGameOver(true));
            setIsTimerRunning(false);
        } else if (isStalemate || isMate) {
            setIsTimerRunning(false);
        } else if (blackTimer === null || whiteTimer === null) {
            setIsTimerRunning(false);
            setIsTimerVisible(false);
        } else {
            setIsTimerRunning(true);
        }
    };

    const startTimer = () => {
        if (isTimerRunning) {
            setIsTimerVisible(true);
            const callback = () => dispatch(timerMove(currentPlayerColor));
            timer.current = setInterval(callback, 1000 / secondsDivisor);
        }
    };

    return { timer, timerCheck, startTimer };
};
