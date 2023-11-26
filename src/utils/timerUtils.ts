import {Colors} from "../models/Colors";
import {Board} from "../models/board/Board";
import {timerType} from "../store/reducers/timersSlice";

export const secondsDivisor = 10;

export function formatTimer(timer: timerType): string {
    if (timer === null) {
        return '∞';
    }
    const minutes = Math.floor(timer / 60000);
    const seconds = Math.ceil((timer % 60000) / 1000);
    const formattedSeconds = seconds === 60 ? 0 : seconds;
    const formattedMinutes = seconds === 60 ? minutes + 1 : minutes;

    return `${formattedMinutes.toString().padStart(2, '0')}:${formattedSeconds.toString().padStart(2, '0')}`;
}

export function momentsSettings(board: Board,
                                oldMoment: timerType,
                                blackTimerMoment: timerType,
                                whiteTimerMoment: timerType): (timerType)[] {
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