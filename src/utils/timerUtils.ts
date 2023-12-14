import {Colors} from "../models/Colors";
import {Board} from "../models/board/Board";
import {timerType} from "../types/types";
import {minimumTimer, minutesLimit} from "./newGameConstants";

export const secondsDivisor = 10;

export const timerConditions = (timer: number | null) => {
    return timer !== null && timer >= minimumTimer && timer <= minutesLimit * 60;
}

export const minutesConditions = (minutes: number | null) => {
    return minutes !== null && minutes >= 0 && minutes <= minutesLimit;
}

export const secondsConditions = (seconds: number | null) => {
    return seconds !== null && seconds >= 0 && seconds <= 59;
}

export const formatTimer = (timer: timerType): string => {
    if (timer === null) {
        return '∞';
    }
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.ceil((timer % 60000) / 1000);
    const formattedSeconds = seconds === 60 ? 0 : seconds;
    const formattedMinutes = seconds === 60 ? minutes + 1 : minutes;

    return `${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
}

export const momentsSettings = (board: Board,
                                oldMoment: timerType,
                                blackTimerMoment: timerType,
                                whiteTimerMoment: timerType): (timerType)[] => {
    let newBlackMoment: timerType = null;
    let newWhiteMoment: timerType = null;
    let newMoment: timerType = null;
    if (oldMoment && blackTimerMoment && whiteTimerMoment) {
        newMoment = new Date().getTime();
        const interval = newMoment - (oldMoment || 0);
        if (board.getCurrentPlayerColor === Colors.BLACK) {
            newBlackMoment = (blackTimerMoment || 0) - interval;
            newWhiteMoment = whiteTimerMoment;
        } else {
            newBlackMoment = blackTimerMoment;
            newWhiteMoment = (whiteTimerMoment || 0) - interval;
        }
    }
    return [newMoment, newBlackMoment, newWhiteMoment];
}

export const minutesTimerChange = (
    minutes: string,
    setTimer: (seconds: number) => void,
    setMinutesInput: (minutes: number | null) => void,
    secondsInput: timerType
) => {
    const newMinutes = minutes ? parseInt(minutes) : null;
    setMinutesInput(newMinutes);
    if (newMinutes !== null && secondsInput !== null) {
        setTimer(newMinutes * 60 + secondsInput);
    } else {
        setTimer(0);
    }
}

export const secondsTimerChange = (
    seconds: string,
    setTimer: (seconds: number) => void,
    setSecondsInput: (seconds: number | null) => void,
    minutesInput: timerType
) => {
    const newSeconds = seconds ? parseInt(seconds) : null;
    setSecondsInput(newSeconds);
    if (newSeconds !== null && minutesInput !== null) {
        setTimer(minutesInput * 60 + newSeconds);
    } else {
        setTimer(0);
    }
}