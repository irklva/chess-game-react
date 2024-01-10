import {Colors} from "../chess-models";
import {Board} from "../chess-models";
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
                                whiteTimerMoment: timerType) => {
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
    return {newMoment, newBlackMoment, newWhiteMoment};
}