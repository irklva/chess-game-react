import {CellModel} from "./functionality/CellModel";
import {Coordinates} from "./functionality/CellParameters";
import {Colors} from "../Colors";
import {FigureNames} from "../figures/functionality/FigureModel";

export class Cell {
    private model: CellModel;

    constructor(cellModel: CellModel) {
        this.model = cellModel;
    }

    public move(targetCell: Cell,
                blackTimer: number | null = null,
                whiteTimer: number | null = null) {
        this.model.cellFigure.move(targetCell.model, blackTimer, whiteTimer);
    }

    public highLightMoveCells(reset: boolean = false) {
        this.model.cellFigure.highLightMoveCells(reset);
    }

    get getID(): number {
        return this.model.parameters.id;
    }

    get getX(): number {
        return this.model.parameters.x;
    }

    get getY(): number {
        return this.model.parameters.y;
    }

    get getChessCoordinates(): Coordinates {
        return this.model.parameters.coordinates;
    }

    get getColor(): Colors {
        return this.model.parameters.color;
    }

    get getAvailable(): boolean {
        return this.model.parameters.getAvailable;
    }

    get getMoveFrom(): boolean {
        return this.model.parameters.getMoveFrom;
    }

    get getMoveTo(): boolean {
        return this.model.parameters.getMoveTo;
    }

    get getFigureColor(): Colors | null {
        return this.model.cellFigure.getObject?.color || null;
    }

    get getFigureName(): FigureNames | null {
        return this.model.cellFigure.getObject?.getName || null;
    }

    get getFigureLogo(): string | null {
        return this.model.cellFigure.getObject?.getLogo || null;
    }
}