import React, {FC} from 'react';
import st from "./moves.module.css";
import {Figure} from "../../models/figures/Figure";
import {Board} from "../../models/Board";
import MoveEntry from "./move-entry/MoveEntry";
import {Colors} from "../../models/Colors";

interface MovesProps {
    whiteMoves: { id: number, figure: Figure, to: string, attack: boolean, castling: string | null, board: Board }[];
    blackMoves: { id: number, figure: Figure, to: string, attack: boolean, castling: string | null, board: Board }[];
}

const Moves: FC<MovesProps> = ({whiteMoves, blackMoves}) => {
    return (
        <div className={st.main}>
            <h5>Moves</h5>
            <div className={st.moves}>
                {whiteMoves.map(move =>
                    <div key={move.id} className="row">
                        <div className="col-3 d-flex align-items-end">
                            {move.id}.
                        </div>
                            <MoveEntry move={move} playerColor={Colors.WHITE}/>
                        {blackMoves[move.id - 1] &&
                            <MoveEntry move={blackMoves[move.id - 1]} playerColor={Colors.BLACK}/>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default Moves;