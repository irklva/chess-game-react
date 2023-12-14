import {useDispatch, useSelector} from "react-redux";
import {
    getBlackTimerMoment,
    getTimeMoment,
    getWhiteTimerMoment,
    setBlackTimerMoment, setTimeMoment, setWhiteTimerMoment
} from "../../../store/reducers/timersSlice";
import {FigureNames} from "../../../models/figures/functionality/FigureModel";
import {momentsSettings} from "../../../utils/timerUtils";
import {Colors} from "../../../models/Colors";
import {setModalGameOver, setModalPromotePawn} from "../../../store/reducers/modalsSlice";
import {PromotePawnProps} from "../../../types/types";

export const usePromotePawn = ({board, setSelectedCell}: PromotePawnProps) => {

    const dispatch = useDispatch();
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