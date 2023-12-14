import React, {FC, useEffect} from 'react';
import st from "./timer.module.css";
import {getBlackTimer, getWhiteTimer} from "../../../store/reducers/timersSlice";
import {useSelector} from "react-redux";
import {getBlackName, getWhiteName} from "../../../store/reducers/playersSlice";
import TimerRow from "./timer-row/TimerRow";
import {useTimer} from "./useTimer";
import {TimerProps} from "../../../types/types";

const Timer: FC<TimerProps> = ({
                                   isMate,
                                   isStalemate,
                                   currentPlayerColor,
                                   isTimerRunning,
                                   setIsTimerRunning
                               }) => {

    const blackTimer = useSelector(getBlackTimer);
    const whiteTimer = useSelector(getWhiteTimer);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);

    const {timer, timerCheck, startTimer} = useTimer({
        isMate,
        isStalemate,
        currentPlayerColor,
        isTimerRunning,
        setIsTimerRunning
    });

    useEffect(() => {
        startTimer();
        const currentTimer = timer.current;
        return () => {
            if (currentTimer) {
                clearInterval(currentTimer);
            }
        }
    }, [currentPlayerColor, isTimerRunning]);

    useEffect(() => {
        timerCheck();
    }, [blackTimer, whiteTimer, isMate, isStalemate, currentPlayerColor]);

    return (
        <div className={st.timer_block}>
            <TimerRow name={blackName} timer={blackTimer}/>
            <TimerRow name={whiteName} timer={whiteTimer}/>
        </div>
    );
};

export default Timer;