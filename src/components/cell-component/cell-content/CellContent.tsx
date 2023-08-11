import React, {FC} from 'react';
import st from "./cell-content.module.css";
import {FigureNames} from "../../../models/figures/functionality/FigureModel";
import {Colors} from "../../../models/Colors";
import {Board} from "../../../models/board/Board";
import {Cell} from "../../../models/cell/Cell";

interface CellContentProps {
    board: Board;
    cell: Cell;
    isSelected: boolean;
}

const CellContent: FC<CellContentProps> = ({
                                               board,
                                               cell,
                                               isSelected
                                           }) => {

    const isBlackKingAttacked = (cell.getFigureName === FigureNames.KING &&
        cell.getFigureColor === Colors.BLACK && board.getBlackCheck);
    const isWhiteKingAttacked = (cell.getFigureName === FigureNames.KING &&
        cell.getFigureColor === Colors.WHITE && board.getWhiteCheck);
    const isBlackMate = (cell.getFigureColor === Colors.BLACK && board.getBlackCheck && board.getMate);
    const isWhiteMate = (cell.getFigureColor === Colors.WHITE && board.getWhiteCheck && board.getMate);
    const isAttacked = cell.getAvailable && cell.getFigureName;
    const movedCell = (cell.getMoveFrom || cell.getMoveTo) && !(cell.getAvailable && cell.getFigureName);
    const dangerCell = ((isAttacked || isBlackKingAttacked || isWhiteKingAttacked ||
        isBlackMate || isWhiteMate) && !isSelected);

    return (
        <div className={st.content}>
            {cell.getAvailable && !cell.getFigureName &&
                <div className={st.available}/>
            }
            {dangerCell &&
                <div className={`${st.shell} ${st.attacked}`}></div>
            }
            {movedCell &&
                <div className={`${st.shell} ${st.move}`}></div>
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