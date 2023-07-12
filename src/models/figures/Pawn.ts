import {Figure, FigureNames} from "./Figure";
import blackLogo from "../../assets/black-pawn.png";
import whiteLogo from "../../assets/white-pawn.png";
import {Colors} from "../Colors";
import {Cell} from "../Cell";

export class Pawn extends Figure {

    direction: number;
    firstStepDirection: number;

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.PAWN;
        this.direction = this.color === Colors.BLACK ? 1 : -1;
        this.firstStepDirection = this.color === Colors.BLACK ? 2 : -2;
        this.isFirstStep = true;
    }

    canMove(target: Cell, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved))
            return false;
        if (!this.cell.pawnCanMove(target, !!this.isFirstStep, this.direction, this.firstStepDirection))
             return false;
        if (this.cell.isMoveDangerousForKing(target))
            return false;
        return true
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.isFirstStep = false;
        if ((this.color === Colors.WHITE && target.y === 0) ||
            (this.color === Colors.BLACK && target.y === 7)) {
            this.cell.board.promotedPawnCell = target;
        }
    }
}