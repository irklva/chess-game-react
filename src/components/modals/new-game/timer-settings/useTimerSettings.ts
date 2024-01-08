import {setMinutesInput, setNewTimer, setSecondsInput} from "../../../../store/reducers/new-game/newGameReducer";
import {minutesTimerChange, secondsTimerChange} from "../../../../utils/timerUtils";
import {useDispatch} from "react-redux";
import {timerType} from "../../../../types/types";

export const useTimerSettings = (minutesInput: timerType, secondsInput: timerType) => {

    const dispatch = useDispatch();

    const setMinutes = (minutes: number | null) => {
        dispatch(setMinutesInput(minutes));
    }

    const setSeconds = (seconds: number | null) => {
        dispatch(setSecondsInput(seconds));
    }

    const setInputTimer = (seconds: number) => {
        dispatch(setNewTimer(seconds));
    }

    const minutesChange = (minutes: string) => {
        minutesTimerChange(minutes, setInputTimer, setMinutes, secondsInput);
    }

    const secondsChange = (seconds: string) => {
        secondsTimerChange(seconds, setInputTimer, setSeconds, minutesInput);
    }

    return {minutesChange, secondsChange};
}