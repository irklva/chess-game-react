import {Player} from "../../models/Player";
import React, {Dispatch, FC, SetStateAction, useEffect, useRef, useState} from "react";
import {Colors} from "../../models/Colors";
import st from "./timer.module.css";
import MyButton from "../UI/button/MyButton";

interface TimerProps {
    currentPlayer: Player | null;
    blackTimer: number | null;
    setBlackTimer: Dispatch<SetStateAction<number | null>>;
    whiteTimer: number | null;
    setWhiteTimer: Dispatch<SetStateAction<number | null>>;
    blackName: string;
    whiteName: string;
    setModalNewGame: Dispatch<SetStateAction<boolean>>;
    setModalGameOver: Dispatch<SetStateAction<boolean>>;
}

const Timer: FC<TimerProps> = ({
                                   currentPlayer,
                                   blackTimer,
                                   setBlackTimer,
                                   whiteTimer,
                                   setWhiteTimer,
                                   blackName,
                                   whiteName,
                                   setModalNewGame,
                                   setModalGameOver
                               }) => {

    const timer = useRef<null | ReturnType<typeof setInterval>>(null);
    const [needTimer, setNeedTimer] = useState(true);

    function startTimer() {
        if (blackTimer && whiteTimer && needTimer) {
            if (timer.current) {
                clearInterval(timer.current);
            }
            const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
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
    }

    function timerCheck() {
        if (blackTimer === 0 || whiteTimer === 0) {
            setNeedTimer(false);
            setModalGameOver(true);
        } else {
            setNeedTimer(true);
        }
    }

    useEffect(() => {
        startTimer();
    }, [currentPlayer, needTimer]);

    useEffect(() => {
        timerCheck();
    }, [blackTimer, whiteTimer])

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