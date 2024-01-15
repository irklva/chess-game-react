import React, {FC} from 'react';
import st from "./moves.module.css";
import MoveEntry from "./move-entry/MoveEntry";
import {useBoard} from "../../board-context/useBoard";
import {Colors, Move} from "../../chess-models";

const Moves: FC = () => {

    const {
        getWhiteMoves: whiteMoves,
        getBlackMoves: blackMoves
    } = useBoard().board;

    return (
        <div className={st.moves_block}>
            <h5>Moves</h5>
            <div className={st.moves}>
                {whiteMoves.map((move: Move) =>
                    <div key={move.id} className="row">
                        <div className="col-3 d-flex align-items-end">
                            {move.id}.
                        </div>
                        <div className="col d-flex align-items-end">
                            <MoveEntry move={move}
                                       playerColor={Colors.WHITE}
                            />
                            {blackMoves[move.id - 1] &&
                                <MoveEntry move={blackMoves[move.id - 1]}
                                           playerColor={Colors.BLACK}
                                />
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Moves;