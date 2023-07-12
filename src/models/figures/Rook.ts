import {Figure, FigureNames} from "./Figure";
import blackLogo from "../../assets/black-rook.png";
import whiteLogo from "../../assets/white-rook.png";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class Rook extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.ROOK;
        this.isFirstStep = true;
    }

    canMove(target: Cell, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved)) {
            return false;
        }
        if (!this.cell.isEmptyVertical(target)
            && !this.cell.isEmptyHorizontal(target))
            return false;
        if (this.cell.isMoveDangerousForKing(target)) {
            return false;
        }
        return true;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}