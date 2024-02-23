import blackLogo from '../../../../../assets/png/black-queen.png';
import whiteLogo from '../../../../../assets/png/white-queen.png';
import { Colors } from '../../../Colors';
import { FigureModel, FigureNames } from '../FigureModel';
import type { CellModel } from '../../../cell/functionality/CellModel';

export class Queen extends FigureModel {
    constructor(color: Colors, cell: CellModel) {
        super(color, cell);
        this.setLogo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.setName = FigureNames.QUEEN;
    }

    canMove(target: CellModel, kingIsSaved = true): boolean {
        const cellParams = this.getCell.parameters;
        if (!super.canMove(target, kingIsSaved))
            return false;
        if (!cellParams.isEmptyVertical(target) &&
            !cellParams.isEmptyHorizontal(target) &&
            !cellParams.isEmptyDiagonal(target))
            return false;
        if (this.getCell.cellFigure.isMoveDangerousForKing(target))
            return false;

        return true;
    }

}
