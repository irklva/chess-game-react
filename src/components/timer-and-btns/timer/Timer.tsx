import React, {FC, useEffect} from 'react';
import st from "./timer.module.css";
import {useSelector} from "react-redux";
import TimerRow from "./timer-row/TimerRow";
import {useTimer} from "./useTimer";
import {TimerProps} from "../../../types/types";
import {useBoard} from "../../../board-context/useBoard";
import {getBlackTimer, getTimeMoment, getWhiteTimer} from "../../../store/reducers/timers/timersSelectors";
import {getBlackName, getWhiteName} from "../../../store/reducers/players/playersSelectors";

const Timer: FC<TimerProps> = ({
                                   isTimerRunning,
                                   setIsTimerRunning
                               }) => {
    const {
        getCurrentPlayerColor: currentPlayerColor,
        getStalemate: isStalemate,
        getMate: isMate
    } = useBoard().board;
    const blackTimer = useSelector(getBlackTimer);
    const whiteTimer = useSelector(getWhiteTimer);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timeMoment = useSelector(getTimeMoment);

    const {timer, timerCheck, startTimer} = useTimer({
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
            <div className={`d-flex flex-column ${timeMoment ? "align-items-end" : "align-items-center"}`}>
                <TimerRow name={blackName} timer={blackTimer}/>
                <TimerRow name={whiteName} timer={whiteTimer}/>
            </div>
        </div>
    );
};

export default Timer;