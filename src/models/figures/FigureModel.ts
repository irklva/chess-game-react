import {Colors} from "../Colors";
import logo from "../../assets/black-bishop.png";
import {CellModel} from "../cell/functionality/CellModel";

export enum FigureNames {
    FIGURE = 'Figure',
    KING = 'King',
    KNIGHT = 'Knight',
    PAWN = 'Pawn',
    QUEEN = 'Queen',
    ROOK = 'Rook',
    BISHOP = 'Bishop'
}

export class FigureModel {
    readonly color: Colors;
    private logo: typeof logo | null;
    private cell: CellModel;
    private name: FigureNames;
    readonly id: number;
    private isFirstStep: boolean | null;

    constructor(color: Colors, cell: CellModel) {
        this.color = color;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
        this.isFirstStep = null;
        this.cell = cell;
        this.cell.cellFigure.setObject = this;
    }

    canMove(target: CellModel, kingIsSaved = true): boolean {
        if (target.cellFigure.getObject?.color === this.color)
            return false;
        if (kingIsSaved && target.cellFigure.getObject?.name === FigureNames.KING)
            return false;
        return true;
    }

    moveFigure(target: CellModel) {}

    get getName() {
        return this.name;
    }

    protected set setName(name: FigureNames) {
        this.name = name;
    }

    get getLogo() {
        return this.logo;
    }

    protected set setLogo(newLogo: typeof logo | null) {
        this.logo = newLogo;
    }

    get getFirstStep() {
        return this.isFirstStep;
    }

    protected set setFirstStep(isFirstStep: boolean | null) {
        this.isFirstStep = isFirstStep;
    }

    get getCell() {
        return this.cell;
    }

    set setCell(cell: CellModel) {
        this.cell = cell;
    }
}