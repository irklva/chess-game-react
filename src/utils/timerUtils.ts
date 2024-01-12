import {timerType} from "../types/types";
import {minimumTimer, minutesLimit} from "./newGameConstants";
import {Colors} from "../chess-models";

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

const checkTimerMoment = (
    oldTimerMoment: timerType,
    oldMoment: timerType
) => {
    let newTimerMoment = null;
    let newMoment = null;
    if (oldTimerMoment && oldMoment) {
        newMoment = new Date().getTime();
        newTimerMoment = oldTimerMoment - (newMoment - oldMoment);
        newTimerMoment = newTimerMoment < 0 ? 0 : newTimerMoment;
    }
    return {newTimerMoment, newMoment};
}

export const checkAllTimerMoments = (
    playerColor: Colors,
    blackTimerMoment: timerType,
    whiteTimerMoment: timerType,
    timeMoment: timerType
) => {
    if (playerColor === Colors.BLACK) {
        const {newTimerMoment: newBlackTimerMoment, newMoment: newTimeMoment} = checkTimerMoment(blackTimerMoment, timeMoment);
        const newWhiteTimerMoment = whiteTimerMoment;
        return {newBlackTimerMoment, newWhiteTimerMoment, newTimeMoment};
    } else {
        const {newTimerMoment: newWhiteTimerMoment, newMoment: newTimeMoment} = checkTimerMoment(whiteTimerMoment, timeMoment);
        const newBlackTimerMoment = blackTimerMoment;
        return {newBlackTimerMoment, newWhiteTimerMoment, newTimeMoment};
    }
}