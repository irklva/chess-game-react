import {CellModel} from "./functionality/CellModel";

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

    get getID() {
        return this.model.parameters.id;
    }

    get getX() {
        return this.model.parameters.x;
    }

    get getY() {
        return this.model.parameters.y;
    }

    get getChessCoordinates() {
        return this.model.parameters.coordinates;
    }

    get getColor() {
        return this.model.parameters.color;
    }

    get getAvailable() {
        return this.model.parameters.getAvailable;
    }

    get getMoveFrom() {
        return this.model.parameters.getMoveFrom;
    }

    get getMoveTo() {
        return this.model.parameters.getMoveTo;
    }

    get getFigureColor() {
        return this.model.cellFigure.getObject?.color;
    }

    get getFigureName() {
        return this.model.cellFigure.getObject?.getName;
    }

    get getFigureLogo() {
        return this.model.cellFigure.getObject?.getLogo;
    }
}