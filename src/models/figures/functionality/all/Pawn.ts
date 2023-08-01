import {FigureModel, FigureNames} from "../FigureModel";
import blackLogo from "../../../../assets/black-pawn.png";
import whiteLogo from "../../../../assets/white-pawn.png";
import {Colors} from "../../../Colors";
import {CellModel} from "../../../cell/functionality/CellModel";

export class Pawn extends FigureModel {

    private readonly direction: number;
    private readonly firstStepDirection: number;

    constructor(color: Colors, cell: CellModel, isFirstStep: boolean | null = true) {
        super(color, cell, isFirstStep);
        this.setLogo = color === Colors.WHITE ? whiteLogo : blackLogo;
        this.setName = FigureNames.PAWN;
        this.direction = this.color === Colors.BLACK ? 1 : -1;
        this.firstStepDirection = this.color === Colors.BLACK ? 2 : -2;
    }

    canMove(target: CellModel, kingIsSaved = true): boolean {
        if (!super.canMove(target, kingIsSaved))
            return false;
        if (!this.getCell.parameters.pawnCanMove(target, !!this.getFirstStep, this.direction, this.firstStepDirection))
             return false;
        if (this.getCell.cellFigure.isMoveDangerousForKing(target))
            return false;
        return true
    }

    moveFigure(target: CellModel) {
        super.moveFigure(target);
        this.setFirstStep = false;
    }
}