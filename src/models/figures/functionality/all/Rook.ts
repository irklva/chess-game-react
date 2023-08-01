import {FigureModel, FigureNames} from "../FigureModel";
import blackLogo from "../../../../assets/black-rook.png";
import whiteLogo from "../../../../assets/white-rook.png";
import {Colors} from "../../../Colors";
import {CellModel} from "../../../cell/functionality/CellModel";

export class Rook extends FigureModel {

    constructor(color: Colors, cell: CellModel, isFirstStep: boolean | null = true) {
        super(color, cell, isFirstStep);
        this.setLogo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.setName = FigureNames.ROOK;
    }

    canMove(target: CellModel, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved)) {
            return false;
        }
        if (!this.getCell.parameters.isEmptyVertical(target)
            && !this.getCell.parameters.isEmptyHorizontal(target))
            return false;
        if (this.getCell.cellFigure.isMoveDangerousForKing(target)) {
            return false;
        }
        return true;
    }

    moveFigure(target: CellModel) {
        super.moveFigure(target);
        this.setFirstStep = false;
    }
}