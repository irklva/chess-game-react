import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { SelectedCellContext } from '../../../board-context/selected-cell/SelectedCellContext';
import { Board, Colors } from '../../../chess-model';
import { setModalNewGame } from '../../../store/model/modal/modalsSlice';
import {
    getBlackNameInput,
    getMinutesInput,
    getNewGameTimer,
    getSecondsInput,
    getWhiteNameInput,
} from '../../../store/model/new-game/newGameSelectors';
import { setNames } from '../../../store/model/players/playersSlice';
import { setTimers } from '../../../store/model/timers/timersSlice';
import { nameSymbolsLimit } from '../../../utils/newGameConstants';
import { minutesConditions, secondsConditions, timerConditions } from '../../../utils/timerHelpers';

export const useNewGame = () => {
    const dispatch = useDispatch();
    const { setBoard, setCurrentPlayerColor } = useContext(BoardContext);
    const { setSelectedCell } = useContext(SelectedCellContext);
    const blackNameInput = useSelector(getBlackNameInput);
    const whiteNameInput = useSelector(getWhiteNameInput);
    const minutesInput = useSelector(getMinutesInput);
    const secondsInput = useSelector(getSecondsInput);
    const timer = useSelector(getNewGameTimer);

    return () => {

        const timerMs = timer ? (timer * 1000) : null;

        const gameSettings = () => {
            dispatch(setTimers({
                blackTimer: timerMs,
                whiteTimer: timerMs,
            }));
            dispatch(setNames({
                whiteName: whiteNameInput,
                blackName: blackNameInput,
            }));
            dispatch(setModalNewGame(false));
        };

        const boardSettings = () => {
            const newBoard = new Board();
            newBoard.initBaseLine();
            setBoard(newBoard);
            setSelectedCell(null);
        };

        const timeConditions = timerConditions(timer) &&
            minutesConditions(minutesInput) &&
            secondsConditions(secondsInput);

        const namesConditions = (whiteNameInput !== '' && whiteNameInput.length <= nameSymbolsLimit &&
            blackNameInput !== '' && blackNameInput.length <= nameSymbolsLimit);

        if (namesConditions && (timer === null || timeConditions)) {
            gameSettings();
            boardSettings();
            setCurrentPlayerColor(Colors.WHITE);
        }
    };

};
