import React, {FC, useState} from "react";
import st from "./timer-and-btns.module.css";
import MyButton from "../UI/button/MyButton";
import {useDispatch} from "react-redux";
import {setTimersToNull} from "../../store/reducers/timersSlice";
import {setModalNewGame} from "../../store/reducers/modalsSlice";
import Timer from "./timer/Timer";
import {Colors} from "../../models/Colors";

interface TimerAndBtnsProps {
    isMate: boolean;
    isStalemate: boolean;
    currentPlayerColor: Colors;
}

const TimerAndBtns: FC<TimerAndBtnsProps> = ({
                                                 isMate,
                                                 isStalemate,
                                                 currentPlayerColor
                                             }) => {

    const dispatch = useDispatch();
    const [isTimerRunning, setIsTimerRunning] = useState(true);

    const newGame = () => {
        dispatch(setModalNewGame(true));
        setIsTimerRunning(false);
    }

    const infiniteSeconds = () => {
        dispatch(setTimersToNull());
    }

    return (
        <div className={st.timer_and_names_block}>
            <MyButton action={newGame}>New game</MyButton>
            <Timer
                isMate={isMate}
                isStalemate={isStalemate}
                currentPlayerColor={currentPlayerColor}
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
            />
            {isTimerRunning &&
                <MyButton action={infiniteSeconds}>Infinite timers</MyButton>
            }
        </div>
    );
};

export default TimerAndBtns;