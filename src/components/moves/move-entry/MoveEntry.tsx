import React, {FC} from 'react';
import {Figure, FigureNames} from "../../../models/figures/Figure";
import st from "./entry.module.css";
import {Board} from "../../../models/Board";
import {Colors} from "../../../models/Colors";

interface EntryProps {
    move: { id: number, figure: Figure, to: string, attack: boolean, castling: string | null, board: Board };
    playerColor: Colors;
}

const MoveEntry: FC<EntryProps> = ({move, playerColor}) => {
    return (
        <div className="col d-flex align-items-end">
            {move.castling === 'big' && "0-0-0"}
            {move.castling === 'small' && "0-0"}

            {!move.castling &&
                <>
                    {move.figure.name !== FigureNames.PAWN &&
                        <div className={st.cell}>
                            <img src={move.figure.logo}
                                 alt={move.figure.name}
                                 className={st.logo}/>
                        </div>
                    }
                    {move.attack && "x"}
                    {move.to}
                </>
            }
            {playerColor === Colors.BLACK && move.board.isWhiteCheck &&
                move.board.isMate && "#"}
            {playerColor === Colors.WHITE && move.board.isBlackCheck &&
                move.board.isMate && "#"}
            {playerColor === Colors.BLACK && move.board.isWhiteCheck &&
                !move.board.isMate && "+"}
            {playerColor === Colors.WHITE && move.board.isBlackCheck &&
                !move.board.isMate && "+"}
            {move.board.isStalemate && "="}
        </div>
    );
};

export default MoveEntry;