import { useDispatch, useSelector } from 'react-redux';
import { useBoard } from '../../../board-context/useBoard';
import { setModalGameOver, setModalPromotePawn } from '../../../store/model/modal/modalsSlice';
import {
    getBlackTimerMoment,
    getTimeMoment,
    getWhiteTimerMoment,
} from '../../../store/model/timers/timersSelectors';
import { rememberAllMoments } from '../../../store/model/timers/timersSlice';
import { checkAllTimerMoments } from '../../../utils/timerHelpers';
import type { FigureNames } from '../../../chess-models';

export const usePromotePawn = () => {

    const dispatch = useDispatch();
    const { board, setSelectedCell } = useBoard();
    const blackTimerMoment = useSelector(getBlackTimerMoment);
    const whiteTimerMoment = useSelector(getWhiteTimerMoment);
    const timeMoment = useSelector(getTimeMoment);

    return (figure: FigureNames) => {

        const {
            newBlackTimerMoment,
            newWhiteTimerMoment,
            newTimeMoment,
        } = checkAllTimerMoments(
            board.getCurrentPlayerColor,
            blackTimerMoment,
            whiteTimerMoment,
            timeMoment,
        );

        dispatch(rememberAllMoments({
            blackTimerMoment: newBlackTimerMoment,
            whiteTimerMoment: newWhiteTimerMoment,
            timeMoment: newTimeMoment,
        }));
        board.promotePawn(figure, newBlackTimerMoment, newWhiteTimerMoment);
        dispatch(setModalPromotePawn(false));
        setSelectedCell(null);
        if (board.getMate || board.getStalemate) {
            dispatch(setModalGameOver(true));
        }
    };
};
