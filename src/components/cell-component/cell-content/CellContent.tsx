import React, {FC} from 'react';
import st from "./cell-content.module.css";
import {FigureNames} from "../../../chess-models";
import {Colors} from "../../../chess-models";
import {Cell} from "../../../chess-models";
import {useBoard} from "../../../board-context/useBoard";

interface CellContentProps {
    cell: Cell;
    isSelected: boolean;
}

const CellContent: FC<CellContentProps> = ({cell, isSelected}) => {

    const {board, selectedCell} = useBoard();

    const isBlackKingAttacked = (cell.getFigureName === FigureNames.KING
                                && cell.getFigureColor === Colors.BLACK
                                && board.getBlackCheck
                                && !selectedCell);
    const isWhiteKingAttacked = (cell.getFigureName === FigureNames.KING
                                && cell.getFigureColor === Colors.WHITE
                                && board.getWhiteCheck
                                && !selectedCell);
    const isBlackMate = (cell.getFigureColor === Colors.BLACK
                        && board.getBlackCheck
                        && board.getMate);
    const isWhiteMate = (cell.getFigureColor === Colors.WHITE
                        && board.getWhiteCheck
                        && board.getMate);
    const isAttacked = cell.getAvailable
                        && cell.getFigureName;
    const movedCell = (cell.getMoveFrom || cell.getMoveTo)
                        && !(cell.getAvailable && cell.getFigureName);
    const dangerCell = ((isAttacked || isBlackKingAttacked || isWhiteKingAttacked || isBlackMate || isWhiteMate)
                        && !isSelected);

    return (
        <div className={st.content}>
            {cell.getAvailable && !cell.getFigureName &&
                <div className={st.available}/>
            }
            {dangerCell &&
                <div className={`${st.shell} ${st.attacked}`}></div>
            }
            {movedCell &&
                <div className={`${st.shell} ${st.moved}`}></div>
            }
            {cell.getFigureLogo &&
                <img src={cell.getFigureLogo} alt={`${cell.getFigureColor} ${cell.getFigureName}`}/>
            }
            {cell.getY === 7 &&
                <div className={`${st.coordinate} ${st.x}`}>
                    {cell.getChessCoordinates.x}
                </div>
            }
            {cell.getX === 0 &&
                <div className={`${st.coordinate} ${st.y}`}>
                    {cell.getChessCoordinates.y}
                </div>
            }
        </div>
    );
};

export default CellContent;