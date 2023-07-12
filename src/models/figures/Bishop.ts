import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import blackLogo from "../../assets/black-bishop.png";
import whiteLogo from "../../assets/white-bishop.png";

export class Bishop extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved)) {
            return false;
        }
        if (!this.cell.isEmptyDiagonal(target))
            return false;
        if (this.cell.isMoveDangerousForKing(target))
            return false;
        return true;
    }

}