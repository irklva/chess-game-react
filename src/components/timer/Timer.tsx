import React, {FC, useEffect, useRef, useState} from "react";
import {Colors} from "../../models/Colors";
import st from "./timer.module.css";
import MyButton from "../UI/button/MyButton";
import {useDispatch, useSelector} from "react-redux";
import {
    blackTimerMove,
    getBlackTimer,
    getWhiteTimer, setBlackTimer,
    setTimeWinner, setWhiteTimer,
    whiteTimerMove
} from "../../store/reducers/timersSlice";
import {getBlackName, getWhiteName} from "../../store/reducers/playersSlice";
import {setModalGameOver, setModalNewGame} from "../../store/reducers/modalsSlice";
import {Board} from "../../models/board/Board";
import {secondDivisor} from "../../utils/constants";

interface TimerProps {
    board: Board;
}

const Timer: FC<TimerProps> = ({board}) => {

    const dispatch = useDispatch();
    const blackTimer = useSelector(getBlackTimer);
    const whiteTimer = useSelector(getWhiteTimer);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const [needTimer, setNeedTimer] = useState(true);

    const timerCheck = () => {
        if (blackTimer === 0 || whiteTimer === 0) {
            setNeedTimer(false);
            dispatch(setTimeWinner(blackTimer ? blackName : whiteName));
            dispatch(setModalGameOver(true));
        } else if (board.getMate || board.getStalemate
            || (blackTimer === null && whiteTimer === null)) {
            setNeedTimer(false);
        } else {
            setNeedTimer(true);
        }
    }

    const startTimer = () => {
        if (blackTimer && whiteTimer && needTimer) {
            if (timer.current) {
                clearInterval(timer.current);
            }
            const callback = board.getCurrentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
            timer.current = setInterval(callback, 1000 / secondDivisor);
        } else {
            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    }

    const decrementBlackTimer = () => {
        dispatch(blackTimerMove());
    }

    const decrementWhiteTimer = () => {
        dispatch(whiteTimerMove());
    }

    const formatTimer = (timer: number) => {
        const minutes = Math.floor(timer / 60000);
        const seconds = Math.ceil((timer % 60000) / 1000);
        const formattedSeconds = seconds === 60 ? 0 : seconds;
        const formattedMinutes = seconds === 60 ? minutes + 1 : minutes;

        return `${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
    }

    const newGame = () => {
        dispatch(setModalNewGame(true));
        setNeedTimer(false);
    }

    const infiniteSeconds = () => {
        dispatch(setBlackTimer(null));
        dispatch(setWhiteTimer(null));
    }

    useEffect(() => {
        startTimer();
    }, [board.getCurrentPlayer, needTimer]);

    useEffect(() => {
        timerCheck();
    }, [blackTimer, whiteTimer]);

    return (
        <div className={st.main}>
            <MyButton action={newGame}>New game</MyButton>
            <div className="d-flex align-items-center">
                <h5 className={st.name}>{blackName}:</h5>
                <h5 className={blackTimer === null ? st.infinite : st.time}>{
                    blackTimer === null
                        ?
                        '∞'
                        :
                        formatTimer(blackTimer)
                }</h5>
            </div>
            <div className="d-flex align-items-center">
                <h5 className={st.name}>{whiteName}:</h5>
                <h5 className={whiteTimer === null ? st.infinite : st.time}>{
                    whiteTimer === null
                        ?
                        '∞'
                        :
                        formatTimer(whiteTimer)
                }</h5>
            </div>
            {blackTimer !== null && !board.getMate && !board.getStalemate &&
                <MyButton action={infiniteSeconds}>Infinite seconds</MyButton>
            }
        </div>
    );
};

export default Timer;