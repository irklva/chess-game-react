import {useDispatch, useSelector} from "react-redux";
import {FigureNames} from "../../../chess-models";
import {momentsSettings} from "../../../utils/timerUtils";
import {Colors} from "../../../chess-models";
import {useBoard} from "../../../board-context/useBoard";
import {setModalGameOver, setModalPromotePawn} from "../../../store/reducers/modal/modalsReducer";
import {getBlackTimerMoment, getTimeMoment, getWhiteTimerMoment} from "../../../store/reducers/timers/timersSelectors";
import {setBlackTimerMoment, setTimeMoment, setWhiteTimerMoment} from "../../../store/reducers/timers/timersReducer";

export const usePromotePawn = () => {

    const dispatch = useDispatch();
    const {board, setSelectedCell} = useBoard();
    const oldMoment = useSelector(getTimeMoment);
    const blackTimerMoment = useSelector(getBlackTimerMoment);
    const whiteTimerMoment = useSelector(getWhiteTimerMoment);

    return (figure: FigureNames) => {
        const [newMoment, newBlackMoment, newWhiteMoment] = momentsSettings(board, oldMoment,
            blackTimerMoment, whiteTimerMoment);
        board.getCurrentPlayerColor === Colors.BLACK
            ?
            dispatch(setBlackTimerMoment(newBlackMoment))
            :
            dispatch(setWhiteTimerMoment(newWhiteMoment))
        dispatch(setTimeMoment(newMoment));
        board.promotePawn(figure, newBlackMoment, newWhiteMoment);
        dispatch(setModalPromotePawn(false));
        setSelectedCell(null);
        if (board.getMate || board.getStalemate) {
            dispatch(setModalGameOver(true));
        }
    }
}