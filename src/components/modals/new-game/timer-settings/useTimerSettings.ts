import { useDispatch } from 'react-redux';
import { setMinutesInput, setSecondsInput } from '../../../../store/model/new-game/newGameSlice';

export const useTimerSettings = () => {

    const dispatch = useDispatch();

    const minutesChange = (minutes: string) => {
        const newMinutes = minutes ? parseInt(minutes) : null;
        dispatch(setMinutesInput(newMinutes));
    };

    const secondsChange = (seconds: string) => {
        const newSeconds = seconds ? parseInt(seconds) : null;
        dispatch(setSecondsInput(newSeconds));
    };

    return { minutesChange, secondsChange };
};
