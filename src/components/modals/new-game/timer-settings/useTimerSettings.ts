import {setMinutesInput, setSecondsInput} from "../../../../store/model/new-game/newGameSlice";
import {useDispatch} from "react-redux";
import {timerType} from "../../../../types/types";

export const useTimerSettings = (minutesInput: timerType, secondsInput: timerType) => {

    const dispatch = useDispatch();

    const minutesChange = (minutes: string) => {
        const newMinutes = minutes ? parseInt(minutes) : null;
        dispatch(setMinutesInput(newMinutes));
    }

    const secondsChange = (seconds: string) => {
        const newSeconds = seconds ? parseInt(seconds) : null;
        dispatch(setSecondsInput(newSeconds));
    }

    return {minutesChange, secondsChange};
}