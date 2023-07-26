import React, {FC} from 'react';
import st from "./moves.module.css";
import MoveEntry from "./move-entry/MoveEntry";
import {Colors} from "../../models/Colors";
import {Move} from "../../models/interfaces/Move";
import {Board} from "../../models/board/Board";

interface MovesProps {
    board: Board;
    changeBoard: (move: Move) => any;
}

const Moves: FC<MovesProps> = ({board, changeBoard}) => {

    return (
        <div className={st.main}>
            <h5>Moves</h5>
            <div className={st.moves}>
                {board.getWhiteMoves.map((move: Move) =>
                    <div key={move.id} className="row">
                        <div className="col-3 d-flex align-items-end">
                            {move.id}.
                        </div>
                        <div className="col d-flex align-items-end">
                            <MoveEntry move={move}
                                       playerColor={Colors.WHITE}
                                       board={board}
                                       changeBoard={changeBoard}
                            />
                            {board.getBlackMoves[move.id - 1] &&
                                <MoveEntry move={board.getBlackMoves[move.id - 1]}
                                           playerColor={Colors.BLACK}
                                           board={board}
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