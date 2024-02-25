import { useDispatch, useSelector } from 'react-redux';
import captureSound from '../../assets/mp3/capture.mp3';
import moveSound from '../../assets/mp3/move.mp3';
import winSound from '../../assets/mp3/win.mp3';
import { useBoard } from '../../board-context/useBoard';
import { getGameSounds } from '../../store/model/game-settings/gameSettingsSelectors';
import { setModalGameOver, setModalPromotePawn } from '../../store/model/modal/modalsSlice';
import {
    getBlackTimerMoment,
    getTimeMoment,
    getTimeWinner,
    getWhiteTimerMoment,
} from '../../store/model/timers/timersSelectors';
import { rememberAllMoments } from '../../store/model/timers/timersSlice';
import { checkAllTimerMoments } from '../../utils/timerHelpers';
import type { Cell } from '../../chess-model';

export const useCellClick = (cell: Cell) => {
    const dispatch = useDispatch();
    const { board, selectedCell, setSelectedCell } = useBoard();
    const timeWinner = useSelector(getTimeWinner);
    const blackTimerMoment = useSelector(getBlackTimerMoment);
    const whiteTimerMoment = useSelector(getWhiteTimerMoment);
    const timeMoment = useSelector(getTimeMoment);
    const sounds = useSelector(getGameSounds);

    return (changeFigureDuringMove = true) => {

        const checkGameOver = (): boolean => {
            if (board.getMate || board.getStalemate || timeWinner) {
                dispatch(setModalGameOver(true));

                return true;
            } else {
                return false;
            }
        };

        const promotePawn = () => {
            if (board.getIsPromotedPawnObject) {
                dispatch(setModalPromotePawn(true));
            } else {
                setSelectedCell(null);
            }
        };

        const {
            newBlackTimerMoment,
            newWhiteTimerMoment,
            newTimeMoment,
        } = checkAllTimerMoments(
            board.getCurrentPlayerColor,
            blackTimerMoment,
            whiteTimerMoment,
            timeMoment,
        );

        if (selectedCell && cell.getAvailable) {
            const attackedFigure = cell.getFigureName;
            dispatch(rememberAllMoments({
                blackTimerMoment: newBlackTimerMoment,
                whiteTimerMoment: newWhiteTimerMoment,
                timeMoment: newTimeMoment,
            }));
            selectedCell.move(cell, newBlackTimerMoment, newWhiteTimerMoment);
            selectedCell.highLightMoveCells(true);
            const gameOver = checkGameOver();
            promotePawn();
            if (sounds) {
                if (gameOver) {
                    new Audio(winSound).play();
                } else if (
                    (board.getWhiteCheck || board.getBlackCheck) ||
                    (attackedFigure)
                ) {
                    new Audio(captureSound).play();
                } else if (sounds) {
                    new Audio(moveSound).play();
                }
            }
        } else if (cell.getFigureColor !== board.getCurrentPlayerColor) {
            cell.highLightMoveCells(true);
            setSelectedCell(null);
        } else if (changeFigureDuringMove && cell.getFigureColor === board.getCurrentPlayerColor) {
            cell.highLightMoveCells(false);
            setSelectedCell(cell);
        }
    };
};
