import { useCallback, useMemo } from 'react';
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

    const setNewBlackName = useCallback((newName: string) => {
        dispatch(setBlackNameInput(newName));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const setNewWhiteName = useCallback((newName: string) => {
        dispatch(setWhiteNameInput(newName));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleInfiniteSecondsCheckbox = useCallback(() => {
        dispatch(setInfiniteSeconds());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const newGame = useNewGame();

    const infiniteSecondsLabel = useMemo(() => {
        return (
            <div className={st.checkbox_label} >
                Infinite timers
            </div >
        );
    }, []);

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
                onChange={handleInfiniteSecondsCheckbox}
            >
                {infiniteSecondsLabel}
            </AppCheckbox >
            <TimerSettings
                areInfiniteSeconds={areInfiniteSeconds}
            />
        </ModalWindow >
    );
};

export default NewGameModal;
