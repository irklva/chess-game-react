import React, {FC} from 'react';
import st from "./moves.module.css";
import MoveEntry from "./move-entry/MoveEntry";
import {Colors} from "../../models/Colors";
import {Move} from "../../models/interfaces/Move";

interface MovesProps {
    blackMoves: Move[];
    whiteMoves: Move[];
    changeBoard: (move: Move) => void;
    boardId: number;
}

const Moves: FC<MovesProps> = ({blackMoves, whiteMoves, changeBoard, boardId}) => {

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
                                       boardId={boardId}
                                       changeBoard={changeBoard}
                            />
                            {blackMoves[move.id - 1] &&
                                <MoveEntry move={blackMoves[move.id - 1]}
                                           playerColor={Colors.BLACK}
                                           boardId={boardId}
                                           changeBoard={changeBoard}
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