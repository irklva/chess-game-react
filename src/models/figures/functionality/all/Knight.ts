import {FigureModel, FigureNames} from "../FigureModel";
import blackLogo from "../../../../assets/black-knight.png";
import whiteLogo from "../../../../assets/white-knight.png";
import {Colors} from "../../../Colors";
import {CellModel} from "../../../cell/functionality/CellModel";

export class Knight extends FigureModel {
    constructor(color: Colors, cell: CellModel) {
        super(color, cell);
        this.setLogo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.setName = FigureNames.KNIGHT;
    }

    canMove(target: CellModel, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved)) {
            return false;
        }
        const dx = Math.abs(this.getCell.parameters.x - target.parameters.x);
        const dy = Math.abs(this.getCell.parameters.y - target.parameters.y);
        if (!((dx === 2 && dy === 1) || (dy === 2 && dx === 1)))
            return false
        if (this.getCell.cellFigure.isMoveDangerousForKing(target))
            return false;
        return true;
    }

}