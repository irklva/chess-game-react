import {timerType} from "../../../types/types";

export interface NewGameSchema {
    blackNameInput: string;
    whiteNameInput: string;
    infiniteSeconds: boolean;
    minutesInput: timerType;
    secondsInput: timerType;
}