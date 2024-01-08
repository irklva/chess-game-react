import React, {FC, useState} from "react";
import st from "./timer-and-btns.module.css";
import MyButton from "../ui/button/MyButton";
import {useDispatch} from "react-redux";
import {setTimersToNull} from "../../store/reducers/timers/timersReducer";
import Timer from "./timer/Timer";
import {setModalNewGame} from "../../store/reducers/modal/modalsReducer";

const TimerAndBtns: FC = () => {

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
            <MyButton onClick={newGame}>New game</MyButton>
            <Timer
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
            />
            {isTimerRunning &&
                <MyButton onClick={infiniteSeconds}>Infinite timers</MyButton>
            }
        </div>
    );
};

export default TimerAndBtns;