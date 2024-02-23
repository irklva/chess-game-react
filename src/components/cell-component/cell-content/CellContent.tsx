import { useState } from 'react';
import { useBoard } from '../../../board-context/useBoard';
import { Colors, FigureNames } from '../../../chess-model';
import st from './cell-content.module.css';
import type { Cell } from '../../../chess-model';
import type { DragEvent , FC } from 'react';


interface CellContentProps {
    cell: Cell;
    isSelected: boolean;
    handleClick: () => void;
}

const CellContent: FC<CellContentProps> = ({ cell, isSelected , handleClick }) => {

    const { board, selectedCell } = useBoard();
    const [startingX, setStartingX] = useState(0);
    const [startingY, setStartingY] = useState(0);

    function handleDragStart(e: DragEvent<HTMLImageElement>) {
        handleClick();
        const draggedItem = e.target as HTMLImageElement; // change if necessary
        setStartingX(e.clientX - draggedItem.offsetLeft);
        setStartingY(e.clientY - draggedItem.offsetTop);
    }

    function handleDrag(e: DragEvent<HTMLImageElement>) {
        const draggedItem = e.target as HTMLImageElement; // change if necessary
        if (draggedItem) {
            draggedItem.style.pointerEvents = 'none';
            draggedItem.style.zIndex = '100';
            draggedItem.style.left = (e.clientX - startingX) + 'px';
            draggedItem.style.top = (e.clientY - startingY) + 'px';
        }
    }

    function handleDragEnd(e: DragEvent<HTMLImageElement>) {
        const draggedItem = e.target as HTMLImageElement; // change if necessary
        if (draggedItem) {
            draggedItem.removeAttribute('style');
        }
    }

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
    const movedCell = (cell.getMoveFrom || cell.getMoveTo) &&
                        !(cell.getAvailable && cell.getFigureName);
    const dangerCell = ((isAttacked || isBlackKingAttacked || isWhiteKingAttacked || isBlackMate || isWhiteMate) &&
                        !isSelected);

    return (
        <>
            {cell.getAvailable && !cell.getFigureName &&
                <div className={st.available}/>
            }
            {cell.getY === 7 &&
                <div
                    className={`
                        ${st.coordinate} 
                        ${cell.getColor === Colors.WHITE ? st.black : st.white} 
                        ${st.x}
                    `}
                >
                    {cell.getChessCoordinates?.x}
                </div>
            }
            {cell.getX === 0 &&
                <div
                    className={`
                        ${st.coordinate} 
                        ${cell.getColor === Colors.WHITE ? st.black : st.white} 
                        ${st.y}
                    `}
                >
                    {cell.getChessCoordinates?.y}
                </div>
            }
            {dangerCell &&
                <div className={`${st.shell} ${st.attacked}`} />
            }
            {movedCell &&
                <div className={`${st.shell} ${st.moved}`} />
            }
            {cell.getFigureLogo &&
                <img
                    src={cell.getFigureLogo}
                    alt={`${cell.getFigureColor} ${cell.getFigureName}`}
                    className={st.figure}
                    draggable={true}
                    onDragStart={handleDragStart}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                />
            }
        </>
    );
};

export default CellContent;
