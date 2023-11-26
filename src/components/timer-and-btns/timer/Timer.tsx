import React, {Dispatch, FC, SetStateAction, useEffect, useRef} from 'react';
import st from "./timer.module.css";
import {formatTimer, secondsDivisor} from "../../../utils/timerUtils";
import {Colors} from "../../../models/Colors";
import {
    blackTimerMove, getBlackTimer,
    getWhiteTimer, setBlackTimer,
    setTimeWinner, setWhiteTimer,
    whiteTimerMove
} from "../../../store/reducers/timersSlice";
import {setModalGameOver} from "../../../store/reducers/modalsSlice";
import {useDispatch, useSelector} from "react-redux";
import {getBlackName, getWhiteName} from "../../../store/reducers/playersSlice";

interface TimerProps {
    isMate: boolean;
    isStalemate: boolean;
    currentPlayerColor: Colors;
    isTimerRunning: boolean;
    setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}

const Timer: FC<TimerProps> = ({
                                   isMate,
                                   isStalemate,
                                   currentPlayerColor,
                                   isTimerRunning,
                                   setIsTimerRunning
                               }) => {

    const dispatch = useDispatch();
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

    useEffect(() => {
        startTimer();
        return () => {
            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    }, [currentPlayerColor, isTimerRunning]);

    useEffect(() => {
        timerCheck();
    }, [blackTimer, whiteTimer, isMate, isStalemate, currentPlayerColor]);

    return (
        <div className={st.timer_block}>
            <div className="d-flex align-items-center">
                <h5 className={st.name}>
                    {blackName}:
                </h5>
                <h5 className={blackTimer === null ? st.infinite : st.time}>
                    {formatTimer(blackTimer)}
                </h5>
            </div>
            <div className="d-flex align-items-center">
                <h5 className={st.name}>
                    {whiteName}:
                </h5>
                <h5 className={whiteTimer === null ? st.infinite : st.time}>
                    {formatTimer(whiteTimer)}
                </h5>
            </div>
        </div>
    );
};

export default Timer;