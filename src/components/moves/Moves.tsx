import { useContext } from 'react';
import { BoardContext } from '../../board-context/board/BoardContext';
import { Colors } from '../../chess-model';
import MoveEntry from './move-entry/MoveEntry';
import st from './moves.module.css';
import type { Move } from '../../chess-model';
import type { FC } from 'react';

const Moves: FC = () => {

    const { board } = useContext(BoardContext);

    return (
        <div className={st.main} >
            <h5 >Moves</h5 >
            <div className={st.list} >
                {board.getWhiteMoves.map((move: Move) =>
                    <div key={move.id} className="row" >
                        <div className="col-3 d-flex align-items-end" >
                            {move.id}.
                        </div >
                        <div className="col d-flex align-items-end" >
                            <MoveEntry move={move}
                                playerColor={Colors.WHITE}
                            />
                            {board.getBlackMoves[move.id - 1] &&
                                <MoveEntry move={board.getBlackMoves[move.id - 1]}
                                    playerColor={Colors.BLACK}
                                />
                            }
                        </div >
                    </div >)}
            </div >
        </div >
    );
};

export default Moves;
