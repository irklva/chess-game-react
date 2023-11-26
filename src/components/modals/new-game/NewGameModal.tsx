import React, {FC, useState} from 'react';
import st from "./new-game.module.css";
import ModalWindow from "../ModalWindow";
import {
    initialMinutes,
    initialSeconds,
    minutesLimit,
    nameSymbolsLimit
} from "../../../utils/newGameConstants";
import {useDispatch, useSelector} from "react-redux";
import {resetTimers, setTimeMoment, timerType} from "../../../store/reducers/timersSlice";
import {setNames} from "../../../store/reducers/playersSlice";
import {getModalNewGame, setModalNewGame} from "../../../store/reducers/modalsSlice";
import TimerSettings from "./timer-settings/TimerSettings";
import PlayerSettings from "./player-settings/PlayerSettings";

interface ModalsComponentProps {
    boardSettings: () => void;
}

const NewGameModal: FC<ModalsComponentProps> = ({boardSettings}) => {
    const dispatch = useDispatch();
    const modalNewGame = useSelector(getModalNewGame);
    const [newBlackName, setNewBlackName] = useState('Black');
    const [newWhiteName, setNewWhiteName] = useState('White');
    const [infiniteSeconds, setInfiniteSeconds] = useState(false);
    const [minutesInput, setMinutesInput] = useState<timerType>(initialMinutes);
    const [secondsInput, setSecondsInput] = useState<timerType>(initialSeconds);
    const [timer, setTimer] = useState<timerType>(initialMinutes * 60);
    const timerMs = timer ? (timer * 1000) : null;

    const gameSettings = () => {
        if (timerMs) {
            dispatch(setTimeMoment(new Date().getTime()));
        } else {
            dispatch(setTimeMoment(null));
        }
        dispatch(resetTimers(timerMs));
        dispatch(setNames({
            whiteName: newWhiteName,
            blackName: newBlackName
        }))
        dispatch(setModalNewGame(false));
    }

    const timersConditions = timer && timer >= 30 && timer <= minutesLimit * 60 &&
        minutesInput !== null && minutesInput >= 0 &&
        secondsInput !== null && secondsInput >= 0 && secondsInput <= 59

    const namesConditions = newWhiteName !== '' && newWhiteName.length <= nameSymbolsLimit &&
        newBlackName !== '' && newBlackName.length <= nameSymbolsLimit;

    const newGame = () => {
        if (namesConditions && (timer === null || timersConditions)) {
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
            <PlayerSettings
                inputId="blackPlayer"
                newNameLabel="Black player:"
                newName={newBlackName}
                setNewName={setNewBlackName}
            />
            <PlayerSettings
                inputId="whitePlayer"
                newNameLabel="White player:"
                newName={newWhiteName}
                setNewName={setNewWhiteName}
            />
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