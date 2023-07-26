import {FigureModel} from "../../figures/FigureModel";
import {Colors} from "../../Colors";

export class BoardLostFigures {
    readonly black: FigureModel[] = [];
    readonly white: FigureModel[] = [];

    constructor(black: FigureModel[] = [], white: FigureModel[] = []) {
        this.black = black;
        this.white = white;
    }

    addLostFigure(figure: FigureModel) {
        figure.color === Colors.WHITE
            ?
            this.white.push(figure)
            :
            this.black.push(figure)
    }
}