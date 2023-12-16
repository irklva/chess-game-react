import {useDispatch, useSelector} from "react-redux";
import {blackTimerMove, getBlackTimer, getWhiteTimer, setBlackTimer, setTimeWinner, setWhiteTimer, whiteTimerMove} from "../../../store/reducers/timersSlice";
import {setModalGameOver} from "../../../store/reducers/modalsSlice";
import {getBlackName, getWhiteName} from "../../../store/reducers/playersSlice";
import {Colors} from "../../../models/other/Colors";
import {secondsDivisor} from "../../../utils/timerUtils";
import {useRef} from "react";
import {TimerProps} from "../../../types/types";
import {useBoard} from "../../../board-context/useBoard";

export const useTimer = ({isTimerRunning, setIsTimerRunning}: TimerProps) => {
    const dispatch = useDispatch();
    const {
        getCurrentPlayerColor: currentPlayerColor,
        getStalemate: isStalemate,
        getMate: isMate
    } = useBoard().board;
    const blackTimer = useSelector(getBlackTimer);
    const whiteTimer = useSelector(getWhiteTimer);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    const timerCheck = () => {
        if (blackTimer && blackTimer < 0) {
            dispatch(setBlackTimer(0));
        } else if (whiteTimer && whiteTimer < 0) {
            dispatch(setWhiteTimer(0));
        } else if (blackTimer === 0 || whiteTimer === 0) {
            setIsTimerRunning(false);
            dispatch(setTimeWinner(blackTimer ? blackName : whiteName));
            dispatch(setModalGameOver(true));
        } else if (isMate || isStalemate
            || (blackTimer === null && whiteTimer === null)) {
            setIsTimerRunning(false);
        } else {
            setIsTimerRunning(true);
        }
    }

    const decrementBlackTimer = () => {
        dispatch(blackTimerMove());
    }

    const decrementWhiteTimer = () => {
        dispatch(whiteTimerMove());
    }

    const startTimer = () => {
        if (isTimerRunning) {
            const callback = currentPlayerColor === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
            timer.current = setInterval(callback, 1000 / secondsDivisor);
        }
    }

    return {timer, timerCheck, startTimer};
}