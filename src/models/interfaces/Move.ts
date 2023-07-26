import {FigureModel} from "../figures/FigureModel";
import {Board} from "../board/Board";

export interface Move {
    id: number,
    figure: FigureModel,
    to: string,
    attack: boolean,
    castling: string | null,
    board: Board | null;
    blackTimer: number | null;
    whiteTimer: number | null;
    promoFigure: FigureModel | null;
}