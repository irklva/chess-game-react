import { memo, useContext } from 'react';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { SelectedCellContext } from '../../../board-context/selected-cell/SelectedCellContext';
import { Colors, FigureNames } from '../../../chess-model';
import st from './cell-markers.module.css';
import type { Cell } from '../../../chess-model';
import type { FC } from 'react';


interface CellMarkersProps {
    cell: Cell;
}

const CellMarkers: FC<CellMarkersProps> = ({ cell }) => {

    const { board } = useContext(BoardContext);
    const { selectedCell } = useContext(SelectedCellContext);

    const isSelected = (cell.getX === selectedCell?.getX && cell.getY === selectedCell?.getY);
    // base colors are independent of others
    const baseCellColors = [
        st.main,
        cell.getColor === Colors.BLACK ? st.black : st.white,
        isSelected ? st.selected : '',
    ];

    // these markers are semi-transparent and depend on other colors
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

    const movedCell = (cell.getMoveFrom || cell.getMoveTo) &&
        !(cell.getAvailable && cell.getFigureName);

    return (
        <div
            className={baseCellColors.join(' ')}
            onDragStart={e => e.preventDefault()}
        >
            {cell.getAvailable && !cell.getFigureName &&
                <div
                    className={st.available}
                />
            }
            {dangerCell &&
                <div
                    className={st.attacked}
                />
            }
            {movedCell &&
                <div
                    className={st.moved}
                />
            }
        </div >
    );
};

export default memo(CellMarkers);
