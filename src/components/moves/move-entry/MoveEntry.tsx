import React, {FC} from 'react';
import {FigureNames} from "../../../chess-models";
import st from "./entry.module.css";
import {Colors} from "../../../chess-models";
import {Move} from "../../../chess-models";
import {useDispatch} from "react-redux";
import {setTimersFromEntry} from "../../../store/model/timers/timersSlice";
import {CastlingNames} from "../../../chess-models";
import {useBoard} from "../../../board-context/useBoard";

interface EntryProps {
    move: Move;
    playerColor: Colors;
}

const MoveEntry: FC<EntryProps> = ({move, playerColor}) => {

    const dispatch = useDispatch();
    const {board, changeBoard} = useBoard();
    const boardId = board.getId;

    const changeMove = () => {
        if (move.board?.getId !== boardId) {
            changeBoard(move);
            dispatch(setTimersFromEntry({
                blackTimer: move.blackTimer,
                whiteTimer: move.whiteTimer
            }));
        }
    }

    return (
        <div className={`col-6 d-flex align-items-end 
                        ${st.entry}
                        ${move.board?.getId !== boardId && st.other} 
                        ${move.board?.getId === boardId && st.current}`}
             onClick={() => changeMove()}>
            {move.castling === CastlingNames.BIG &&
                "0-0-0"}
            {move.castling === CastlingNames.SMALL &&
                "0-0"}
            {!move.castling &&
                <>
                    {move.figure.getName !== FigureNames.PAWN &&
                        move.figure.getLogo &&
                        <div className={st.cell}>
                            <img src={move.figure.getLogo}
                                 alt={`${move.figure.getColor} ${move.figure.getName}`}
                                 className={st.logo}/>
                        </div>
                    }
                    {move.attack &&
                        "x"}
                    {move.to}
                </>
            }
            {playerColor === Colors.BLACK && move.board?.getWhiteCheck &&
                move.board?.getMate &&
                "#"}
            {playerColor === Colors.WHITE && move.board?.getBlackCheck &&
                move.board?.getMate &&
                "#"}
            {playerColor === Colors.BLACK && move.board?.getWhiteCheck &&
                !move.board?.getMate &&
                "+"}
            {playerColor === Colors.WHITE && move.board?.getBlackCheck &&
                !move.board?.getMate &&
                "+"}
            {move.board?.getStalemate &&
                "="}
            {move.promoFigure &&
                move.promoFigure.getLogo &&
                <img src={move.promoFigure.getLogo}
                     alt={`${move.promoFigure.getColor} ${move.promoFigure.getName}`}
                     className={st.logo}/>
            }
        </div>
    );
};

export default MoveEntry;