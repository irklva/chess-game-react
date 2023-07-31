import React, {Dispatch, FC, SetStateAction} from "react";
import st from "./cell-component.module.css";
import {Colors} from "../../models/Colors";
import {FigureNames} from "../../models/figures/FigureModel";
import {Cell} from "../../models/cell/Cell";
import {setModalGameOver, setModalPromotePawn} from "../../store/reducers/modalsSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    getBlackTimerMoment,
    getTimeMoment,
    getTimeWinner,
    getWhiteTimerMoment,
    setBlackTimerMoment,
    setTimeMoment,
    setWhiteTimerMoment
} from "../../store/reducers/timersSlice";
import {Board} from "../../models/board/Board";
import {momentsSettings} from "../../utils/timerUtils";

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
            board.getCurrentPlayerColor === Colors.BLACK
                ?
                dispatch(setBlackTimerMoment(newBlackMoment))
                :
                dispatch(setWhiteTimerMoment(newWhiteMoment))
            dispatch(setTimeMoment(newMoment));
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

    const isBlackKingAttacked = (cell.getFigureName === FigureNames.KING &&
        cell.getFigureColor === Colors.BLACK && board.getBlackCheck)
    const isWhiteKingAttacked = (cell.getFigureName === FigureNames.KING &&
        cell.getFigureColor === Colors.WHITE && board.getWhiteCheck)
    const isBlackMate = (cell.getFigureColor === Colors.BLACK && board.getBlackCheck && board.getMate)
    const isWhiteMate = (cell.getFigureColor === Colors.WHITE && board.getWhiteCheck && board.getMate)
    const isAttacked = cell.getAvailable && cell.getFigureName;
    const selected = (cell.getX === selectedCell?.getX && cell.getY === selectedCell?.getY);
    const movedCell = (cell.getMoveFrom || cell.getMoveTo) && !(cell.getAvailable && cell.getFigureName);
    const cellClasses = [
        st.cell,
        cell.getColor === Colors.BLACK ? st.black : st.white,
        isAttacked ? st.attacked : '',
        isBlackKingAttacked ? st.attacked : '',
        isWhiteKingAttacked ? st.attacked : '',
        isBlackMate ? st.attacked : '',
        isWhiteMate ? st.attacked : '',
        selected ? st.selected : ''
    ]

    return (
        <div
            className={cellClasses.join(' ')}
            onClick={() => click()}
        >
            <div className={st.content}>
                {cell.getAvailable && !cell.getFigureName &&
                    <div className={st.available}/>
                }
                {movedCell &&
                    <div className={st.move}></div>
                }
                {cell.getFigureLogo &&
                    <img src={cell.getFigureLogo} alt={`${cell.getFigureColor} ${cell.getFigureName}`}/>
                }
                {cell.getY === 7 &&
                    <div className={st.x}>
                        {cell.getChessCoordinates.x}
                    </div>
                }
                {cell.getX === 0 &&
                    <div className={st.y}>
                        {cell.getChessCoordinates.y}
                    </div>
                }
            </div>
        </div>
    );
};

export default CellComponent;