import {Colors} from "../../other/Colors";
import {Figure} from "../../other/figures/Figure";

export class BoardLostFigures {
    readonly black: Figure[] = [];
    readonly white: Figure[] = [];

    constructor(black: Figure[] = [], white: Figure[] = []) {
        this.black = black;
        this.white = white;
    }

    addLostFigure(figure: Figure) {
        figure.getColor === Colors.WHITE
            ?
            this.white.push(figure)
            :
            this.black.push(figure)
    }
}