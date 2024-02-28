import { memo, useContext } from 'react';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { SelectedCellContext } from '../../../board-context/selected-cell/SelectedCellContext';
import { Colors, FigureNames } from '../../../chess-model';
import st from './cell-markers.module.css';
import type { Cell } from '../../../chess-model';
import type { FC } from 'react';


interface CellMarkersProps {
    cell: Cell;
    isSelected: boolean;
}

const CellMarkers: FC<CellMarkersProps> = ({ cell, isSelected }) => {

    const { board } = useContext(BoardContext);
    const { selectedCell } = useContext(SelectedCellContext);

    const isBlackKingAttacked = (cell.getFigureName === FigureNames.KING &&
        cell.getFigureColor === Colors.BLACK &&
        board.getBlackCheck &&
        !selectedCell);
    const isWhiteKingAttacked = (cell.getFigureName === FigureNames.KING &&
        cell.getFigureColor === Colors.WHITE &&
        board.getWhiteCheck &&
        !selectedCell);
    const isBlackMate = (cell.getFigureColor === Colors.BLACK &&
        board.getBlackCheck &&
        board.getMate);
    const isWhiteMate = (cell.getFigureColor === Colors.WHITE &&
        board.getWhiteCheck &&
        board.getMate);
    const isAttacked = cell.getAvailable &&
        cell.getFigureName;

    const dangerCell = ((isAttacked || isBlackKingAttacked || isWhiteKingAttacked || isBlackMate || isWhiteMate) &&
        !isSelected);

    return (
        <>
            {cell.getAvailable && !cell.getFigureName &&
                <div className={st.available}/>
            }
            {dangerCell &&
                <div className={st.attacked} />
            }
        </>
    );
};

export default memo(CellMarkers);
