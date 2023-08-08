import {Colors} from "../../Colors";
import logo from "../../../assets/black-bishop.png";
import {CellModel} from "../../cell/functionality/CellModel";
import {Figure} from "../Figure";

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
    readonly figure: Figure;

    constructor(color: Colors, cell: CellModel, isFirstStep: boolean | null = null) {
        this.color = color;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
        this.isFirstStep = isFirstStep;
        this.cell = cell;
        this.cell.cellFigure.setObject = this;
        this.figure = new Figure(this);
    }

    canMove(target: CellModel, kingIsSaved = true): boolean {
        if (target.cellFigure.getObject?.color === this.color)
            return false;
        if (kingIsSaved && target.cellFigure.getObject?.name === FigureNames.KING)
            return false;
        return true;
    }

    moveFigure(target: CellModel) {}

    get getName(): FigureNames {
        return this.name;
    }

    protected set setName(name: FigureNames) {
        this.name = name;
    }

    get getLogo(): string | null {
        return this.logo;
    }

    protected set setLogo(newLogo: typeof logo | null) {
        this.logo = newLogo;
    }

    get getFirstStep(): boolean | null {
        return this.isFirstStep;
    }

    protected set setFirstStep(isFirstStep: boolean) {
        this.isFirstStep = isFirstStep;
    }

    get getCell(): CellModel {
        return this.cell;
    }

    set setCell(cell: CellModel) {
        this.cell = cell;
    }
}