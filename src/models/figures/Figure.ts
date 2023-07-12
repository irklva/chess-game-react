import {Colors} from "../Colors";
import logo from "../../assets/black-bishop.png";
import {Cell} from "../Cell";

export enum FigureNames {
    FIGURE = 'Figure',
    KING = 'King',
    KNIGHT = 'Knight',
    PAWN = 'Pawn',
    QUEEN = 'Queen',
    ROOK = 'Rook',
    BISHOP = 'Bishop'
}

export class Figure {
    color: Colors;
    logo: typeof logo | null;
    cell: Cell;
    name: FigureNames;
    id: number;
    isFirstStep: boolean | null;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = Math.random();
        this.isFirstStep = null;
    }

    canMove(target: Cell, kingIsSaved = true): boolean {
        if (target.figure?.color === this.color)
            return false;
        if (kingIsSaved && target.figure?.name === FigureNames.KING)
            return false;
        return true;
    }

    moveFigure(target: Cell) {}
}