import React, {Dispatch, FC, SetStateAction} from "react";
import st from "./cell-component.module.css";
import {Colors} from "../../models/Colors";
import {Cell} from "../../models/cell/Cell";
import {setModalGameOver, setModalPromotePawn} from "../../store/reducers/modalsSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    getBlackTimerMoment, getTimeMoment, getTimeWinner,
    getWhiteTimerMoment, setBlackTimerMoment, setTimeMoment,
    setWhiteTimerMoment
} from "../../store/reducers/timersSlice";
import {Board} from "../../models/board/Board";
import {momentsSettings} from "../../utils/timerUtils";
import CellContent from "./cell-content/CellContent";

interface CellProps {
    board: Board;
    selectedCell: Cell | null;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
    cell: Cell;
}

const CellComponent: FC<CellProps> = ({
                                          board,
                                          selectedCell,
                                          setSelectedCell,
                                          cell
                                      }) => {

    const dispatch = useDispatch();
    const timeWinner = useSelector(getTimeWinner);
    const oldMoment = useSelector(getTimeMoment);
    const blackTimerMoment = useSelector(getBlackTimerMoment);
    const whiteTimerMoment = useSelector(getWhiteTimerMoment);

    const click = () => {
        if (selectedCell && cell.getAvailable) {
            const [newMoment, newBlackMoment, newWhiteMoment] = momentsSettings(board, oldMoment,
                blackTimerMoment, whiteTimerMoment);
            if (newMoment && newBlackMoment && newWhiteMoment) {
                board.getCurrentPlayerColor === Colors.BLACK
                    ?
                    dispatch(setBlackTimerMoment(newBlackMoment))
                    :
                    dispatch(setWhiteTimerMoment(newWhiteMoment))
                dispatch(setTimeMoment(newMoment));
            }
            selectedCell.move(cell, newBlackMoment, newWhiteMoment);
            selectedCell.highLightMoveCells(true);
            if (board.getMate || board.getStalemate || timeWinner) {
                dispatch(setModalGameOver(true));
            }
            if (board.getIsPromotedPawnObject) {
                dispatch(setModalPromotePawn(true));
            } else {
                setSelectedCell(null);
            }
        } else if (selectedCell === cell) {
            cell.highLightMoveCells(true);
            setSelectedCell(null);
        } else if (cell.getFigureColor === board.getCurrentPlayerColor) {
            cell.highLightMoveCells();
            setSelectedCell(cell);
        }
    }

    const isSelected = (cell.getX === selectedCell?.getX && cell.getY === selectedCell?.getY);
    const cellClasses = [
        st.cell,
        cell.getColor === Colors.BLACK ? st.black : st.white,
        isSelected ? st.selected : ''
    ]

    return (
        <div
            className={cellClasses.join(' ')}
            onClick={() => click()}
        >
            <CellContent
                board={board}
                cell={cell}
                isSelected={isSelected}
            />
        </div>
    );
};

export default CellComponent;