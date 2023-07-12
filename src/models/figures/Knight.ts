import {Figure, FigureNames} from "./Figure";
import blackLogo from "../../assets/black-knight.png";
import whiteLogo from "../../assets/white-knight.png";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KNIGHT;
    }

    canMove(target: Cell, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved)) {
            return false;
        }
        const dx = Math.abs(this.cell.x - target.x);
        const dy = Math.abs(this.cell.y - target.y);
        if (!((dx === 2 && dy === 1) || (dy === 2 && dx === 1)))
            return false
        if (this.cell.isMoveDangerousForKing(target))
            return false;
        return true;
    }

}