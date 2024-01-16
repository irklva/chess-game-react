import { useDispatch } from 'react-redux';
import { useBoard } from '../../../board-context/useBoard';
import { CastlingNames, Colors, FigureNames } from '../../../chess-models';
import { setTimers } from '../../../store/model/timers/timersSlice';
import st from './entry.module.css';
import type { Move } from '../../../chess-models';
import type { FC } from 'react';

interface EntryProps {
    move: Move;
    playerColor: Colors;
}

const MoveEntry: FC<EntryProps> = ({ move, playerColor }) => {

    const dispatch = useDispatch();
    const { board, changeBoard } = useBoard();
    const boardId = board.getId;

    const changeMove = () => {
        if (move.board?.getId !== boardId) {
            changeBoard(move);
            dispatch(setTimers({
                blackTimer: move.blackTimer,
                whiteTimer: move.whiteTimer
            }));
        }
    };

    const entryClass = move.board?.getId === boardId ? st.current : st.other;

    const renderCastling = () => {
        if (move.castling === CastlingNames.BIG) {
            return '0-0-0';
        } else if (move.castling === CastlingNames.SMALL) {
            return '0-0';
        }
    };

    const renderCheckMateStalemate = () => {
        if (playerColor === Colors.BLACK && move.board?.getWhiteCheck) {
            return move.board?.getMate ? '#' : '+';
        } else if (playerColor === Colors.WHITE && move.board?.getBlackCheck) {
            return move.board?.getMate ? '#' : '+';
        } else if (move.board?.getStalemate) {
            return '=';
        }
    };

    const renderMoveFigureLogo = () => {
        return (
            <>
                {move.figure?.getName !== FigureNames.PAWN && move.figure?.getLogo &&
                    <div className={st.cell}>
                        <img src={move.figure.getLogo}
                            alt={`${move.figure.getColor} ${move.figure.getName}`}
                            className={st.logo}/>
                    </div>
                }
            </>
        );
    };

    return (
        <div
            className={`col-6 d-flex align-items-end ${st.entry} ${entryClass}`}
            onClick={changeMove}
        >
            {renderCastling()}
            {!move.castling &&
                <>
                    {renderMoveFigureLogo()}
                    {move.attack && 'x'}
                    {move.to}
                </>
            }
            {renderCheckMateStalemate()}
            {move.promoFigure && move.promoFigure?.getLogo &&
                <img
                    src={move.promoFigure.getLogo}
                    alt={`${move.promoFigure.getColor} ${move.promoFigure.getName}`}
                    className={st.logo}
                />
            }
        </div>
    );
};

export default MoveEntry;
