import React, {FC, useState} from 'react';
import st from "./new-game.module.css";
import MyInput from "../../UI/input/MyInput";
import ModalWindow from "../ModalWindow";
import {
    initialMinutes,
    initialSeconds,
    minutesLimit,
    nameSymbolsLimit,
    secondsLimit
} from "../../../utils/constants";
import {useDispatch, useSelector} from "react-redux";
import {setBlackTimer, setTimeWinner, setWhiteTimer} from "../../../store/reducers/timersSlice";
import {setBlackName, setWhiteName} from "../../../store/reducers/playersSlice";
import {getModalNewGame, setModalNewGame} from "../../../store/reducers/modalsSlice";
import TimerSettings from "./timer-settings/TimerSettings";

interface ModalsComponentProps {
    boardSettings: () => void;
}

const NewGameModal: FC<ModalsComponentProps> = ({boardSettings}) => {
    const dispatch = useDispatch();
    const modalNewGame = useSelector(getModalNewGame);
    const [newBlackName, setNewBlackName] = useState('Black');
    const [newWhiteName, setNewWhiteName] = useState('White');
    const [infiniteSeconds, setInfiniteSeconds] = useState(false);
    const [minutesInput, setMinutesInput] = useState<number | null>(initialMinutes);
    const [secondsInput, setSecondsInput] = useState<number | null>(initialSeconds);
    const [timer, setTimer] = useState<number | null>(initialMinutes * 60);
    const timerMs = timer ? (timer * 1000) : null;

    const gameSettings = () => {
        dispatch(setBlackTimer(timerMs));
        dispatch(setWhiteTimer(timerMs));
        dispatch(setTimeWinner(null));
        dispatch(setWhiteName(newWhiteName));
        dispatch(setBlackName(newBlackName));
        dispatch(setModalNewGame(false));
    }

    const newGame = () => {
        if (timer === null
            || (timer && timer >= 30 && timer <= minutesLimit * 60
                && minutesInput !== null && minutesInput >= 0
                && secondsInput !== null && secondsInput >= 0 && secondsInput <= 59
                && newWhiteName !== '' && newWhiteName.length <= nameSymbolsLimit
                && newBlackName !== '' && newBlackName.length <= nameSymbolsLimit)) {
            gameSettings();
            boardSettings();
        }
    }

    const handleCheckboxChange = () => {
        if (!infiniteSeconds) {
            setMinutesInput(null);
            setSecondsInput(null);
            setTimer(null);
        } else {
            setMinutesInput(initialMinutes);
            setSecondsInput(initialSeconds);
            setTimer(initialMinutes * 60 + initialSeconds);
        }
        setInfiniteSeconds(!infiniteSeconds);
    }

    return (
        <ModalWindow
            show={modalNewGame}
            setShow={null}
            title={'New game'}
            action={newGame}
            btnName={'Start'}
            closeBtn={false}
        >
            <div className={st.block}>
                <label htmlFor="blackPlayer">Black player: </label>
                <div className={st.input}>
                    <MyInput id="blackPlayer" type="text" value={newBlackName}
                             onChange={(e: any) => setNewBlackName(e.target.value)}/>
                    {(newBlackName === '' || newBlackName.length > nameSymbolsLimit) &&
                        <div className={`text-danger ${st.message}`}>
                            1 - {nameSymbolsLimit} symbols
                        </div>
                    }
                </div>
            </div>
            <div className={st.block}>
                <label htmlFor="whitePlayer">White player: </label>
                <div className={st.input}>
                    <MyInput id="whitePlayer" type="text" value={newWhiteName}
                             onChange={(e: any) => setNewWhiteName(e.target.value)}/>
                    {(newWhiteName === '' || newWhiteName.length > nameSymbolsLimit) &&
                        <div className={`text-danger ${st.message}`}>
                            1 - {nameSymbolsLimit} symbols
                        </div>
                    }
                </div>
            </div>
            <div className={st.checkbox}>
                <label htmlFor="infiniteSeconds">
                    <div className={st.name}>
                        Infinite timers
                    </div>
                    <input id="infiniteSeconds" type="checkbox" checked={infiniteSeconds}
                           onChange={handleCheckboxChange}/>
                    <span></span>
                </label>
            </div>
            {!infiniteSeconds &&
                <TimerSettings
                    timer={timer}
                    setTimer={setTimer}
                    minutesInput={minutesInput}
                    setMinutesInput={setMinutesInput}
                    secondsInput={secondsInput}
                    setSecondsInput={setSecondsInput}
                />
            }
        </ModalWindow>
    );
};

export default NewGameModal;