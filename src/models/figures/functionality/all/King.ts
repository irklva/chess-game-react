import {FigureModel, FigureNames} from "../FigureModel";
import {Colors} from "../../../Colors";
import whiteLogo from "../../../../assets/white-king.png";
import blackLogo from "../../../../assets/black-king.png";
import {CellModel} from "../../../cell/functionality/CellModel";
import {CastlingNames} from "../../../board/functionality/BoardFlags";

export class King extends FigureModel {

    constructor(color: Colors, cell: CellModel, isFirstStep: boolean | null = true) {
        super(color, cell, isFirstStep);
        this.setLogo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.setName = FigureNames.KING;
    }

    private castlingParametersUpd(target: CellModel, xKing: number, xRook: number): boolean {
        const rookCell = target.board.cells.getModel(xRook, this.getCell.parameters.y);
        if (target.parameters.y === this.getCell.parameters.y && target.parameters.x === xKing &&
            rookCell.cellFigure.getObject?.getFirstStep
        ) {
            return true;
        } else {
            return false;
        }
    }

    private castling(target: CellModel): boolean {
        const boardCells = this.getCell.board.cells;
        const isCheck = this.color === Colors.BLACK
            ?
            this.getCell.board.checkAndMate.getBlackCheck
            :
            this.getCell.board.checkAndMate.getWhiteCheck
        const leftRook = boardCells.getModel(0, target.parameters.y);
        const leftRookTarget = boardCells.getModel(3, target.parameters.y);
        const rightRook = boardCells.getModel(7, target.parameters.y);
        const rightRookTarget = boardCells.getModel(5, target.parameters.y);

        return !!(this.getFirstStep && !isCheck &&
            ((this.castlingParametersUpd(target, 2, 0) &&
                    this.getCell.parameters.isEmptyHorizontal(leftRook) &&
                !leftRookTarget.parameters.attacked(this.color))
                ||
                (this.castlingParametersUpd(target, 6, 7) &&
                    this.getCell.parameters.isEmptyHorizontal(rightRook) &&
                !rightRookTarget.parameters.attacked(this.color))
            )
        );
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
        const cellY = this.getCell.parameters.y;
        const targetCells = target.board.cells;

        super.moveFigure(target);
        this.getCell.board.kings.kingMove(target, this.color);
        if (this.getFirstStep &&
            target.parameters.y === this.getCell.parameters.y) {
            if (target.parameters.x === 2) {
                const leftRook = targetCells.getModel(0, cellY).cellFigure.getObject;
                targetCells.getModel(3, cellY).cellFigure.setObject = leftRook;
                targetCells.getModel(0, cellY).cellFigure.setObject = null;
                this.getCell.board.flags.setCastling = CastlingNames.BIG;
            }
            if (target.parameters.x === 6) {
                const rightRook = targetCells.getModel(7, cellY).cellFigure.getObject;
                targetCells.getModel(5, cellY).cellFigure.setObject = rightRook;
                targetCells.getModel(7, cellY).cellFigure.setObject = null;
                this.getCell.board.flags.setCastling = CastlingNames.SMALL;
            }
        }
        this.setFirstStep = false;
    }
}