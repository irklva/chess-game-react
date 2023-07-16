import React, {FC, useState} from 'react';
import st from "./new-game.module.css";
import MyInput from "../../UI/input/MyInput";
import ModalWindow from "../modal-window/ModalWindow";
import {nameSymbolsLimit, secondsLimit} from "../../../utils/constants";

interface ModalsComponentProps {
    modalNewGame: boolean;
    start: (timer: number | null, newWhiteName: string, newBlackName: string) => void;
}

const NewGameModal: FC<ModalsComponentProps> = ({
                          modalNewGame,
                          start
                      }) => {
    const [newBlackName, setNewBlackName] = useState('Black');
    const [newWhiteName, setNewWhiteName] = useState('White');
    const [infiniteSeconds, setInfiniteSeconds] = useState(false);
    const [timer, setTimer] = useState<number | null>(300);

    function newGame() {
        start(timer, newWhiteName, newBlackName);
    }

    function handleCheckboxChange() {
        if (!infiniteSeconds) {
            setTimer(null);
        } else {
            setTimer(300);
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
            <div className={st.input}>
                <label htmlFor="blackPlayer">Black player: </label>
                <MyInput id="blackPlayer" type="text" value={newBlackName}
                         onChange={(e: any) => setNewBlackName(e.target.value)}/>
                {(newBlackName === '' || newBlackName.length > nameSymbolsLimit) &&
                    <div className={`text-danger ${st.message}`}>Input the 1 - {nameSymbolsLimit} symbols name</div>}
            </div>
            <div className={st.input}>
                <label htmlFor="whitePlayer">White player: </label>
                <MyInput id="whitePlayer" type="text" value={newWhiteName}
                         onChange={(e: any) => setNewWhiteName(e.target.value)}/>
                {(newWhiteName === '' || newWhiteName.length > nameSymbolsLimit) &&
                    <div className={`text-danger ${st.message}`}>Input the 1 - {nameSymbolsLimit} symbols name</div>}
            </div>
            <div className={st.input}>
                <label htmlFor="infiniteSeconds">Infinite seconds: </label>
                <input id="infiniteSeconds" type="checkbox" checked={infiniteSeconds}
                       onChange={handleCheckboxChange}/>
            </div>
            {!infiniteSeconds && <div className={st.input}>
                <label htmlFor="seconds">Seconds: </label>
                <MyInput id="seconds" type="number" min="1" max={secondsLimit} value={timer}
                         onChange={(e: any) => {
                             setTimer(e.target.value)
                         }}/>
                {timer && (timer < 1 || timer > secondsLimit) && <div className={`text-danger ${st.message}`}>
                    Input 1 - {secondsLimit} seconds
                </div>}
            </div>}
        </ModalWindow>
    );
};

export default NewGameModal;