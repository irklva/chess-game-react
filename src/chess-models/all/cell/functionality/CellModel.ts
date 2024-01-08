import {BoardModel} from "../../board/functionality/BoardModel";
import {CellParameters} from "./CellParameters";
import {CellFigure} from "./CellFigure";
import {Colors} from "../../Colors";
import {Cell} from "../Cell";

interface CellCopy {
    cell: Cell,
    cellModel: CellModel
}

export class CellModel {
    parameters: CellParameters;
    cellFigure: CellFigure;
    board: BoardModel;

    constructor(board: BoardModel, x: number, y: number, color: Colors,
                moveFrom: boolean = false, moveTo: boolean = false) {
        this.board = board;
        this.cellFigure = new CellFigure(this, this.board);
        this.parameters = new CellParameters(x, y, color, this,
            this.cellFigure, this.board.cells, moveFrom, moveTo);
    }

    copy(board: BoardModel): CellCopy {
        const newCellModel = new CellModel(
            board,
            this.parameters.x,
            this.parameters.y,
            this.parameters.color,
            this.parameters.getMoveFrom,
            this.parameters.getMoveTo
        );
        if (this.cellFigure.getObject) {
            newCellModel.cellFigure.setObject =
                this.cellFigure.getCopyFigure(newCellModel);
        }
        const newCell = new Cell(newCellModel);
        return {cell: newCell, cellModel: newCellModel};
    }
}