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

    const minutesChange = (minutes: any) => {
        const newMinutes = minutes ? parseInt(minutes) : null;
        setMinutesInput(newMinutes);
        if (newMinutes !== null && secondsInput !== null) {
            setTimer(newMinutes * 60 + secondsInput);
        } else {
            setTimer(0);
        }
    }

    const secondsChange = (seconds: any) => {
        const newSeconds = seconds ? parseInt(seconds) : null;
        setSecondsInput(newSeconds);
        if (newSeconds !== null && minutesInput !== null) {
            setTimer(minutesInput * 60 + newSeconds);
        } else {
            setTimer(0);
        }
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
                        Infinite timer
                    </div>
                    <input id="infiniteSeconds" type="checkbox" checked={infiniteSeconds}
                           onChange={handleCheckboxChange}/>
                    <span></span>
                </label>
            </div>
            {!infiniteSeconds &&
                <div className={st.block}>
                    <label>Timer: </label>
                    <div className={st.input}>
                        <div className="d-flex justify-content-between">
                            <div className={st.time}>
                                <MyInput id="minutes" type="number" min="0" max={minutesLimit}
                                         value={minutesInput === null ? "" : minutesInput}
                                         onChange={(e: any) => {
                                             minutesChange(e.target.value)
                                         }}/>
                                <div className={st.name}>minutes</div>
                                {(minutesInput === null || minutesInput < 0) &&
                                    <div className={`text-danger ${st.message}`}>
                                        more then 0 minutes
                                    </div>
                                }
                            </div>
                            <div className={st.time}>
                                <MyInput id="seconds" type="number" min="0" max={secondsLimit}
                                         value={secondsInput === null ? "" : secondsInput}
                                         onChange={(e: any) => {
                                             secondsChange(e.target.value)
                                         }}/>
                                <div className={st.name}>seconds</div>
                                {(secondsInput === null || (secondsInput < 0 || secondsInput > 59)) &&
                                    <div className={`text-danger ${st.message}`}>
                                        0 - 59 seconds
                                    </div>
                                }
                            </div>
                        </div>
                        {timer !== null && minutesInput !== null && secondsInput !== null &&
                            (timer < 30 || timer > minutesLimit * 60) &&
                            <div className={`text-danger ${st.message}`}>
                                00:30 - 60:00
                            </div>
                        }
                    </div>
                </div>
            }
        </ModalWindow>
    );
};

export default NewGameModal;