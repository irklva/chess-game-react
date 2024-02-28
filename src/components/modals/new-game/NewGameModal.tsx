import { useDispatch, useSelector } from 'react-redux';
import { getModalNewGame } from '../../../store/model/modal/modalsSelectors';
import {
    getBlackNameInput,
    getInfiniteSeconds,
    getWhiteNameInput,
} from '../../../store/model/new-game/newGameSelectors';
import {
    setBlackNameInput,
    setInfiniteSeconds,
    setWhiteNameInput,
} from '../../../store/model/new-game/newGameSlice';
import AppCheckbox from '../../ui/checkbox/AppCheckbox';
import ModalWindow from '../ModalWindow';
import st from './new-game.module.css';
import PlayerSettings from './player-settings/PlayerSettings';
import TimerSettings from './timer-settings/TimerSettings';
import { useNewGame } from './useNewGame';
import type { FC } from 'react';

const NewGameModal: FC = () => {
    const dispatch = useDispatch();
    const modalNewGame = useSelector(getModalNewGame);
    const blackNameInput = useSelector(getBlackNameInput);
    const whiteNameInput = useSelector(getWhiteNameInput);
    const areInfiniteSeconds = useSelector(getInfiniteSeconds);

    const setNewBlackName = (newName: string) => {
        dispatch(setBlackNameInput(newName));
    };

    const setNewWhiteName = (newName: string) => {
        dispatch(setWhiteNameInput(newName));
    };

    const newGame = useNewGame();

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
                newName={blackNameInput}
                setNewName={setNewBlackName}
            />
            <PlayerSettings
                inputId="whitePlayer"
                newNameLabel="White player:"
                newName={whiteNameInput}
                setNewName={setNewWhiteName}
            />
            <AppCheckbox
                checkboxId="infiniteSeconds"
                checked={areInfiniteSeconds}
                onChange={() => dispatch(setInfiniteSeconds())}
            >
                <div className={st.checkbox_label}>
                    Infinite timers
                </div>
            </AppCheckbox>
            <TimerSettings
                areInfiniteSeconds={areInfiniteSeconds}
            />
        </ModalWindow>
    );
};

export default NewGameModal;
