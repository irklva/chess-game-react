import {Figure, FigureNames} from "./Figure";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class Queen extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved))
            return false;
        if (!this.cell.isEmptyVertical(target)
            && !this.cell.isEmptyHorizontal(target)
            && !this.cell.isEmptyDiagonal(target))
            return false;
        if (this.cell.isMoveDangerousForKing(target))
            return false;
        return true;
    }

}