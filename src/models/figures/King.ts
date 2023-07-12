import {Figure, FigureNames} from "./Figure";
import {Colors} from "../Colors";
import {Cell} from "../Cell";
import whiteLogo from "../../assets/white-king.png";
import blackLogo from "../../assets/black-king.png";

export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.name = FigureNames.KING;
        this.isFirstStep = true;
    }

    castlingFiguresCheck(target: Cell, xKing: number, xRook: number) {
        if (target.y === this.cell.y && target.x === xKing &&
            target.board.getCell(xRook, this.cell.y).figure?.name === FigureNames.ROOK &&
            target.board.getCell(xRook, this.cell.y).figure?.isFirstStep
        ) {
            return true;
        }
    }

    private castling(target: Cell) {
        if (this.isFirstStep === true &&
            (this.castlingFiguresCheck(target, 2, 0) ||
                this.castlingFiguresCheck(target, 6, 7)) &&
            this.cell.isEmptyHorizontal(target)
        ) {
            return true;
        }
    }

    canMove(target: Cell, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved))
            return false;
        if (
            (Math.abs(target.x - this.cell.x) > 1 ||
                Math.abs(target.y - this.cell.y) > 1) &&
            !this.castling(target)
        ) {
            return false;
        }
        if (this.cell.isMoveDangerousForKing(target))
            return false;
        return true;
    }

    moveFigure(target: Cell) {
        super.moveFigure(target);
        this.color === Colors.BLACK
            ?
            this.cell.board.blackKingCell = {x: target.x, y: target.y}
            :
            this.cell.board.whiteKingCell = {x: target.x, y: target.y}
        if (this.isFirstStep &&
            target.y === this.cell.y) {
            if (target.x === 2) {
                target.board.getCell(3, this.cell.y).setFigure(<Figure>target.board.getCell(0, this.cell.y).figure);
                target.board.getCell(0, this.cell.y).figure = null;
            }
            if (target.x === 6) {
                target.board.getCell(5, this.cell.y).setFigure(<Figure>target.board.getCell(7, this.cell.y).figure);
                target.board.getCell(7, this.cell.y).figure = null;
            }
        }
        this.isFirstStep = false;
    }
}