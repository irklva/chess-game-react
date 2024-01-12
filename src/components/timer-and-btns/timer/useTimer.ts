import {useDispatch, useSelector} from "react-redux";
import {setTimeWinner, timerMove} from "../../../store/model/timers/timersSlice";
import {secondsDivisor} from "../../../utils/timerUtils";
import {useRef} from "react";
import {TimerProps} from "../../../types/types";
import {useBoard} from "../../../board-context/useBoard";
import {setModalGameOver} from "../../../store/model/modal/modalsSlice";
import {getBlackTimer, getWhiteTimer} from "../../../store/model/timers/timersSelectors";
import {getBlackName, getWhiteName} from "../../../store/model/players/playersSelectors";

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
        if (blackTimer === 0 || whiteTimer === 0) {
            setIsTimerRunning(false);
            dispatch(setTimeWinner(blackTimer ? blackName : whiteName));
            dispatch(setModalGameOver(true));
        } else if (isMate || isStalemate || (blackTimer === null && whiteTimer === null)) {
            setIsTimerRunning(false);
        } else {
            setIsTimerRunning(true);
        }
    }

    const startTimer = () => {
        if (isTimerRunning) {
            const callback = () => dispatch(timerMove(currentPlayerColor));
            timer.current = setInterval(callback, 1000 / secondsDivisor);
        }
    }

    return {timer, timerCheck, startTimer};
}