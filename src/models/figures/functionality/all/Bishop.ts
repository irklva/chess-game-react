import {FigureModel, FigureNames} from "../FigureModel";
import {Colors} from "../../../Colors";
import blackLogo from "../../../../assets/black-bishop.png";
import whiteLogo from "../../../../assets/white-bishop.png";
import {CellModel} from "../../../cell/functionality/CellModel";

export class Bishop extends FigureModel {

    constructor(color: Colors, cell: CellModel) {
        super(color, cell);
        this.setLogo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.setName = FigureNames.BISHOP;
    }

    canMove(target: CellModel, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved)) {
            return false;
        }
        if (!this.getCell.parameters.isEmptyDiagonal(target))
            return false;
        if (this.getCell.cellFigure.isMoveDangerousForKing(target))
            return false;
        return true;
    }

}