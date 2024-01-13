import {setTimers} from "../../../store/model/timers/timersSlice";
import {setNames} from "../../../store/model/players/playersSlice";
import {nameSymbolsLimit} from "../../../utils/newGameConstants";
import {useDispatch, useSelector} from "react-redux";
import {minutesConditions, secondsConditions, timerConditions} from "../../../utils/timerHelpers";
import {useBoard} from "../../../board-context/useBoard";
import {setModalNewGame} from "../../../store/model/modal/modalsSlice";
import {
    getBlackNameInput,
    getMinutesInput,
    getNewGameTimer,
    getSecondsInput,
    getWhiteNameInput
} from "../../../store/model/new-game/newGameSelectors";

export const useNewGame = () => {
    const dispatch = useDispatch();
    const {boardSettings} = useBoard();
    const blackNameInput = useSelector(getBlackNameInput);
    const whiteNameInput = useSelector(getWhiteNameInput);
    const minutesInput = useSelector(getMinutesInput);
    const secondsInput = useSelector(getSecondsInput);
    const timer = useSelector(getNewGameTimer);

    return () => {

        const timerMs = timer ? (timer * 1000) : null;

        const gameSettings = () => {
            dispatch(setTimers({
                blackTimer: timerMs,
                whiteTimer: timerMs
            }));
            dispatch(setNames({
                whiteName: whiteNameInput,
                blackName: blackNameInput
            }))
            dispatch(setModalNewGame(false));
        }

        const timeConditions = timerConditions(timer)
            && minutesConditions(minutesInput)
            && secondsConditions(secondsInput);

        const namesConditions = (whiteNameInput !== '' && whiteNameInput.length <= nameSymbolsLimit &&
            blackNameInput !== '' && blackNameInput.length <= nameSymbolsLimit);

        if (namesConditions && (timer === null || timeConditions)) {
            gameSettings();
            boardSettings();
        }
    }

}