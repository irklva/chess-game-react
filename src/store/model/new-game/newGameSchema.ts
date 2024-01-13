import {TimerType} from "../../../types/types";

export interface NewGameSchema {
    blackNameInput: string;
    whiteNameInput: string;
    infiniteSeconds: boolean;
    minutesInput: TimerType;
    secondsInput: TimerType;
}