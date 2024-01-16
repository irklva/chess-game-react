import { Colors } from '../chess-models';
import { minimumTimer, minutesLimit } from './newGameConstants';
import type { TimerType } from '../types/types';

export const secondsDivisor = 10;

export const timerConditions = (timer: number | null) => {
    return timer !== null && timer >= minimumTimer && timer <= minutesLimit * 60;
};

export const minutesConditions = (minutes: number | null) => {
    return minutes !== null && minutes >= 0 && minutes <= minutesLimit;
};

export const secondsConditions = (seconds: number | null) => {
    return seconds !== null && seconds >= 0 && seconds <= 59;
};

export enum formatTimerInputType {
    MS = 1000,
    SEC = 1,
}

export const formatTimer = (timer: TimerType, inputType: formatTimerInputType): string => {
    if (timer === null) {
        return '∞';
    }
    let minutes = Math.floor(timer / (60 * inputType));
    let seconds = Math.ceil((timer % (60 * inputType)) / inputType);
    if (seconds === 60) {
        minutes += 1;
        seconds = 0;
    }

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

const checkTimerMoment = (
    oldTimerMoment: TimerType,
    oldMoment: TimerType
) => {
    let newTimerMoment = null;
    let newMoment = null;
    if (oldTimerMoment && oldMoment) {
        newMoment = new Date().getTime();
        newTimerMoment = oldTimerMoment - (newMoment - oldMoment);
        newTimerMoment = newTimerMoment < 0 ? 0 : newTimerMoment;
    }

    return { newTimerMoment, newMoment };
};

export const checkAllTimerMoments = (
    playerColor: Colors,
    blackTimerMoment: TimerType,
    whiteTimerMoment: TimerType,
    timeMoment: TimerType
) => {
    if (playerColor === Colors.BLACK) {
        const { newTimerMoment: newBlackTimerMoment, newMoment: newTimeMoment } =
            checkTimerMoment(blackTimerMoment, timeMoment);
        const newWhiteTimerMoment = whiteTimerMoment;

        return { newBlackTimerMoment, newWhiteTimerMoment, newTimeMoment };
    } else {
        const { newTimerMoment: newWhiteTimerMoment, newMoment: newTimeMoment } =
            checkTimerMoment(whiteTimerMoment, timeMoment);
        const newBlackTimerMoment = blackTimerMoment;

        return { newBlackTimerMoment, newWhiteTimerMoment, newTimeMoment };
    }
};
