import {FigureModel, FigureNames} from "./functionality/FigureModel";
import {Colors} from "../Colors";

export class Figure {
    private model: FigureModel;

    constructor(figureModel: FigureModel) {
        this.model = figureModel;
    }

    get getId(): number {
        return this.model.id;
    }

    get getLogo(): string | null {
        return this.model.getLogo;
    }

    get getColor(): Colors {
        return this.model.color;
    }

    get getName(): FigureNames {
        return this.model.getName;
    }

}