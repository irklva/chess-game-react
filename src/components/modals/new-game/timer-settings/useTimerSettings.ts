import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setMinutesInput, setSecondsInput } from '../../../../store/model/new-game/newGameSlice';

export const useTimerSettings = () => {

    const dispatch = useDispatch();

    const changeMinutes = useCallback((minutes: string) => {
        const newMinutes = minutes ? parseInt(minutes) : null;
        dispatch(setMinutesInput(newMinutes));
    }, [dispatch]);

    const changeSeconds = useCallback((seconds: string) => {
        const newSeconds = seconds ? parseInt(seconds) : null;
        dispatch(setSecondsInput(newSeconds));
    }, [dispatch]);

    return { changeMinutes, changeSeconds };
};
