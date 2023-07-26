import {FigureModel, FigureNames} from "../FigureModel";
import {Colors} from "../../Colors";
import whiteLogo from "../../../assets/white-king.png";
import blackLogo from "../../../assets/black-king.png";
import {CellModel} from "../../cell/functionality/CellModel";

export class King extends FigureModel {

    constructor(color: Colors, cell: CellModel) {
        super(color, cell);
        this.setLogo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.setName = FigureNames.KING;
        this.setFirstStep = true;
    }

    private castlingFiguresCheck(target: CellModel, xKing: number, xRook: number) {
        if (target.parameters.y === this.getCell.parameters.y && target.parameters.x === xKing &&
            target.board.cells.getModel(xRook,
                this.getCell.parameters.y).cellFigure.getObject?.getName === FigureNames.ROOK &&
            target.board.cells.getModel(xRook,
                this.getCell.parameters.y).cellFigure.getObject?.getFirstStep
        ) {
            return true;
        }
    }

    private castling(target: CellModel) {
        if (this.getFirstStep === true &&
            (this.castlingFiguresCheck(target, 2, 0) ||
                this.castlingFiguresCheck(target, 6, 7)) &&
            this.getCell.parameters.isEmptyHorizontal(target)
        ) {
            return true;
        }
    }

    canMove(target: CellModel, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved))
            return false;
        if (
            (Math.abs(target.parameters.x - this.getCell.parameters.x) > 1 ||
                Math.abs(target.parameters.y - this.getCell.parameters.y) > 1) &&
            !this.castling(target)
        ) {
            return false;
        }
        if (this.getCell.cellFigure.isMoveDangerousForKing(target))
            return false;
        return true;
    }

    moveFigure(target: CellModel) {
        super.moveFigure(target);
        this.getCell.board.kings.kingMove(target, this.color);
        if (this.getFirstStep &&
            target.parameters.y === this.getCell.parameters.y) {
            if (target.parameters.x === 2) {
                const leftRook = target.board.cells.getModel(0, this.getCell.parameters.y).cellFigure.getObject;
                if (leftRook) {
                    target.board.cells.getModel(3, this.getCell.parameters.y).cellFigure.setObject = leftRook;
                    target.board.cells.getModel(0, this.getCell.parameters.y).cellFigure.setObject = null;
                    this.getCell.board.flags.setCastling = "big";
                }
            }
            if (target.parameters.x === 6) {
                const rightRook = target.board.cells.getModel(7, this.getCell.parameters.y).cellFigure.getObject;
                target.board.cells.getModel(5, this.getCell.parameters.y).cellFigure.setObject = rightRook;
                target.board.cells.getModel(7, this.getCell.parameters.y).cellFigure.setObject = null;
                this.getCell.board.flags.setCastling = "small";
            }
        }
        this.setFirstStep = false;
    }
}