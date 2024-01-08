import {RootState} from "../../store";
import {timerType} from "../../../types/types";

export const getBlackNameInput = (state: RootState): string => state.newGame.blackNameInput;
export const getWhiteNameInput = (state: RootState): string => state.newGame.whiteNameInput;
export const getInfiniteSeconds = (state: RootState): boolean => state.newGame.infiniteSeconds;
export const getMinutesInput = (state: RootState): timerType => state.newGame.minutesInput;
export const getSecondsInput = (state: RootState): timerType => state.newGame.secondsInput;
export const getNewTimer = (state: RootState): timerType => state.newGame.newTimer;