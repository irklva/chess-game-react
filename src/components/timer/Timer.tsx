import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from "react";
import {Colors} from "../../models/Colors";
import st from "./timer.module.css";
import MyButton from "../UI/button/MyButton";
import {Board} from "../../models/Board";

interface TimerProps {
    board: Board;
    seconds: number | null;
    setTimeWinner: Dispatch<SetStateAction<string | null>>;
    setSeconds: Dispatch<SetStateAction<number | null>>;
    blackName: string;
    whiteName: string;
    setModalNewGame: Dispatch<SetStateAction<boolean>>;
    setModalGameOver: Dispatch<SetStateAction<boolean>>;
}

const Timer: FC<TimerProps> = ({
                                   board,
                                   seconds,
                                   setSeconds,
                                   setTimeWinner,
                                   blackName,
                                   whiteName,
                                   setModalNewGame,
                                   setModalGameOver
                               }) => {

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const [needTimer, setNeedTimer] = useState(true);
    const [blackTimer, setBlackTimer] = useState<number | null>(null);
    const [whiteTimer, setWhiteTimer] = useState<number | null>(null);

    function timerCheck() {
        if (blackTimer === 0 || whiteTimer === 0) {
            setNeedTimer(false);
            setTimeWinner(blackTimer ? blackName : whiteName);
            setSeconds(0);
            setModalGameOver(true);
        } else {
            setNeedTimer(true);
        }
    }

    function startTimer() {
        if (blackTimer && whiteTimer && needTimer && !board.isMate && !board.isStalemate) {
            if (timer.current) {
                clearInterval(timer.current);
            }
            const callback = board.currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
            timer.current = setInterval(callback, 1000);
        } else {
            if (timer.current) {
                clearInterval(timer.current);
            }
        }
    }

    function decrementBlackTimer() {
        setBlackTimer(prevState => prevState ? prevState - 1 : null)
    }

    function decrementWhiteTimer() {
        setWhiteTimer(prevState => prevState ? prevState - 1 : null)
    }

    function newGame() {
        setModalNewGame(true);
        setNeedTimer(false);
        setSeconds(0);
    }

    useEffect(() => {
        startTimer();
    }, [board.currentPlayer, needTimer]);

    useEffect(() => {
        timerCheck();
    }, [blackTimer, whiteTimer]);

    useEffect(() => {
        if (seconds !== 0) {
            setBlackTimer(seconds);
            setWhiteTimer(seconds);
        }
    }, [seconds]);

    return (
        <div className={st.main}>
            <MyButton action={newGame}>New game</MyButton>
            <div className="d-flex align-items-center">
                <h5 className={st.name}>{blackName}:</h5>
                <h5 className={st.time}>{blackTimer === null ? '∞' : blackTimer}</h5>
            </div>
            <div className="d-flex align-items-center">
                <h5 className={st.name}>{whiteName}:</h5>
                <h5 className={st.time}>{whiteTimer === null ? '∞' : whiteTimer}</h5>
            </div>
        </div>
    );
};

export default Timer;