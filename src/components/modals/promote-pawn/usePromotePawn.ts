import {useDispatch, useSelector} from "react-redux";
import {
    getBlackTimerMoment,
    getTimeMoment,
    getWhiteTimerMoment,
    setBlackTimerMoment, setTimeMoment, setWhiteTimerMoment
} from "../../../store/reducers/timersSlice";
import {FigureNames} from "../../../models/other/figures/functionality/FigureModel";
import {momentsSettings} from "../../../utils/timerUtils";
import {Colors} from "../../../models/other/Colors";
import {setModalGameOver, setModalPromotePawn} from "../../../store/reducers/modalsSlice";
import {useBoard} from "../../../board-context/useBoard";

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