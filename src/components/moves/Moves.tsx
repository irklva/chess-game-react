import React, {FC} from 'react';
import st from "./moves.module.css";
import {Figure} from "../../models/figures/Figure";

interface MovesProps {
    whiteMoves: { id: number, from: string, to: string, figure: Figure }[];
    blackMoves: { id: number, from: string, to: string, figure: Figure }[];
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
                        <div className="col d-flex align-items-end">
                            {<img src={move.figure.logo} alt={move.figure.name}
                                  className={st.logo}/>} {move.from}-{move.to}
                        </div>
                        {blackMoves[move.id - 1] &&
                            <div className="col d-flex align-items-end">
                                {<img src={blackMoves[move.id - 1].figure.logo}
                                      alt={blackMoves[move.id - 1].figure.name}
                                      className={st.logo}/>}
                                {blackMoves[move.id - 1].from + '-' + blackMoves[move.id - 1].to}
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default Moves;