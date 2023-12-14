import {Colors} from "../models/Colors";
import {Dispatch, SetStateAction} from "react";
import {Board} from "../models/board/Board";
import {Cell} from "../models/cell/Cell";

export type timerType = number | null;

export interface TimerProps {
    isMate: boolean;
    isStalemate: boolean;
    currentPlayerColor: Colors;
    isTimerRunning: boolean;
    setIsTimerRunning: Dispatch<SetStateAction<boolean>>;
}

export interface PromotePawnProps {
    board: Board;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
}