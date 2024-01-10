import {useDispatch, useSelector} from "react-redux";
import {
    setBlackTimerMoment,
    setTimeMoment,
    setWhiteTimerMoment
} from "../../store/model/timers/timersSlice";
import {Cell} from "../../chess-models";
import {momentsSettings} from "../../utils/timerUtils";
import {Colors} from "../../chess-models";
import {useBoard} from "../../board-context/useBoard";
import {setModalGameOver, setModalPromotePawn} from "../../store/model/modal/modalsSlice";
import {
    getBlackTimerMoment,
    getTimeMoment,
    getTimeWinner,
    getWhiteTimerMoment
} from "../../store/model/timers/timersSelectors";

export const useCellClick = (
    cell: Cell
) => {
    const dispatch = useDispatch();
    const {board, selectedCell, setSelectedCell} = useBoard();
    const timeWinner = useSelector(getTimeWinner);
    const oldMoment = useSelector(getTimeMoment);
    const blackTimerMoment = useSelector(getBlackTimerMoment);
    const whiteTimerMoment = useSelector(getWhiteTimerMoment);

    return () => {

        const {newMoment, newBlackMoment, newWhiteMoment} = momentsSettings(board, oldMoment,
            blackTimerMoment, whiteTimerMoment);

        const newTimerMoment = () => {
            if (newMoment && newBlackMoment && newWhiteMoment) {
                board.getCurrentPlayerColor === Colors.BLACK
                    ?
                    dispatch(setBlackTimerMoment(newBlackMoment))
                    :
                    dispatch(setWhiteTimerMoment(newWhiteMoment))
                dispatch(setTimeMoment(newMoment));
            }
        }

        const gameOver = () => {
            if (board.getMate || board.getStalemate || timeWinner) {
                dispatch(setModalGameOver(true));
            }
        }

        const promotedPawn = () => {
            if (board.getIsPromotedPawnObject) {
                dispatch(setModalPromotePawn(true));
            } else {
                setSelectedCell(null);
            }
        }

        if (selectedCell && cell.getAvailable) {
            newTimerMoment();
            selectedCell.move(cell, newBlackMoment, newWhiteMoment);
            selectedCell.highLightMoveCells(true);
            gameOver();
            promotedPawn();
        } else if (selectedCell === cell) {
            cell.highLightMoveCells(true);
            setSelectedCell(null);
        } else if (cell.getFigureColor === board.getCurrentPlayerColor) {
            cell.highLightMoveCells();
            setSelectedCell(cell);
        }
    }
}
