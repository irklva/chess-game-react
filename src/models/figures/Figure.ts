import {FigureModel} from "./FigureModel";

export class Figure {
    private model: FigureModel;

    constructor(figureModel: FigureModel) {
        this.model = figureModel;
    }

    get getId() {
        return this.model.id;
    }

    get getLogo() {
        return this.model.getLogo;
    }

    get getColor() {
        return this.model.color;
    }

    get getName() {
        return this.model.getName;
    }

}