import { useDispatch, useSelector } from 'react-redux';
import { useBoard } from '../../board-context/useBoard';
import { setModalGameOver, setModalPromotePawn } from '../../store/model/modal/modalsSlice';
import {
    getBlackTimerMoment,
    getTimeMoment,
    getTimeWinner,
    getWhiteTimerMoment,
} from '../../store/model/timers/timersSelectors';
import { rememberAllMoments } from '../../store/model/timers/timersSlice';
import { checkAllTimerMoments } from '../../utils/timerHelpers';
import type { Cell } from '../../chess-models';

export const useCellClick = (cell: Cell) => {
    const dispatch = useDispatch();
    const { board, selectedCell, setSelectedCell } = useBoard();
    const timeWinner = useSelector(getTimeWinner);
    const blackTimerMoment = useSelector(getBlackTimerMoment);
    const whiteTimerMoment = useSelector(getWhiteTimerMoment);
    const timeMoment = useSelector(getTimeMoment);

    return () => {

        const gameOver = () => {
            if (board.getMate || board.getStalemate || timeWinner) {
                dispatch(setModalGameOver(true));
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
            dispatch(rememberAllMoments({
                blackTimerMoment: newBlackTimerMoment,
                whiteTimerMoment: newWhiteTimerMoment,
                timeMoment: newTimeMoment,
            }));
            selectedCell.move(cell, newBlackTimerMoment, newWhiteTimerMoment);
            selectedCell.highLightMoveCells(true);
            gameOver();
            promotePawn();
        } else if (selectedCell === cell) {
            cell.highLightMoveCells(true);
            setSelectedCell(null);
        } else if (cell.getFigureColor === board.getCurrentPlayerColor) {
            cell.highLightMoveCells(false);
            setSelectedCell(cell);
        }
    };
};
