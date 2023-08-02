import {CellModel} from "../../cell/functionality/CellModel";
import {Colors} from "../../Colors";

interface KingCell {
    x: number,
    y: number
}

export class BoardKings {
    private blackKing: KingCell;
    private whiteKing: KingCell;

    constructor(blackKing: KingCell = {x: 4, y: 0},
                whiteKing: KingCell = {x: 4, y: 7}
    ) {
        this.blackKing = blackKing;
        this.whiteKing = whiteKing;
    }

    get getBlackKing(): KingCell {
        return this.blackKing;
    }

    set setBlackKing(cellParameters: KingCell) {
        this.blackKing = cellParameters;
    }

    get getWhiteKing(): KingCell {
        return this.whiteKing;
    }

    set setWhiteKing(cellParameters: KingCell) {
        this.whiteKing = cellParameters;
    }

    kingMove(target: CellModel, color: Colors) {
        color === Colors.BLACK
            ?
            this.blackKing = {x: target.parameters.x, y: target.parameters.y}
            :
            this.whiteKing = {x: target.parameters.x, y: target.parameters.y}
    }
}