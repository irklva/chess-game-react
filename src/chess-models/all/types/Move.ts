import {Board} from "../board/Board";
import {Figure} from "../figures/Figure";

export interface Move {
    id: number,
    figure: Figure,
    to: string,
    attack: boolean,
    castling: string | null,
    board: Board | null;
    blackTimer: number | null;
    whiteTimer: number | null;
    promoFigure: Figure | null;
}