import React, {FC} from 'react';
import {FigureNames} from "../../../models/figures/FigureModel";
import st from "./entry.module.css";
import {Colors} from "../../../models/Colors";
import {Move} from "../../../models/interfaces/Move";
import {Board} from "../../../models/board/Board";
import {useDispatch} from "react-redux";
import {
    setBlackTimer,
    setTimeWinner,
    setWhiteTimer
} from "../../../store/reducers/timersSlice";

interface EntryProps {
    move: Move;
    playerColor: Colors;
    board: Board;
    changeBoard: (move: Move) => any;
}

const MoveEntry: FC<EntryProps> = ({move, playerColor, board, changeBoard}) => {

    const dispatch = useDispatch();

    const changeMove = () => {
        if (move.board?.getId !== board.getId) {
            changeBoard(move);
            dispatch(setBlackTimer(move.blackTimer));
            dispatch(setWhiteTimer(move.whiteTimer));
            dispatch(setTimeWinner(null));
        }
    }

    return (
        <div className={`col-6 d-flex align-items-end 
                        ${st.main}
                        ${move.board?.getId !== board.getId && st.other} 
                        ${move.board?.getId === board.getId && st.current}`}
             onClick={() => changeMove()}>
            {move.castling === 'big' && "0-0-0"}
            {move.castling === 'small' && "0-0"}
            {!move.castling &&
                <>
                    {move.figure.getName !== FigureNames.PAWN &&
                        <div className={st.cell}>
                            <img src={move.figure.getLogo}
                                 alt={move.figure.getName}
                                 className={st.logo}/>
                        </div>
                    }
                    {move.attack && "x"}
                    {move.to}
                </>
            }
            {playerColor === Colors.BLACK && move.board?.getWhiteCheck &&
                move.board?.getMate && "#"}
            {playerColor === Colors.WHITE && move.board?.getBlackCheck &&
                move.board?.getMate && "#"}
            {playerColor === Colors.BLACK && move.board?.getWhiteCheck &&
                !move.board?.getMate && "+"}
            {playerColor === Colors.WHITE && move.board?.getBlackCheck &&
                !move.board?.getMate && "+"}
            {move.board?.getStalemate && "="}
            {move.promoFigure &&
                <img src={move.promoFigure.getLogo}
                     alt={move.promoFigure.getName}
                     className={st.logo}/>
            }
        </div>
    );
};

export default MoveEntry;