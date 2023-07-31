import {BoardModel} from "./functionality/BoardModel";
import {FigureNames} from "../figures/FigureModel";

export class Board {
    private model: BoardModel;

    constructor(boardFunctionality: BoardModel = new BoardModel()) {
        this.model = boardFunctionality;
    }

    public initBaseLine() {
        this.model.initBaseline();
    }

    public promotePawn(figure: FigureNames,
                       blackTimer: number | null = null,
                       whiteTimer: number | null = null) {
        this.model.promotePawn(figure, blackTimer, whiteTimer);
    }

    get getId() {
        return this.model.getId;
    }

    get getCells() {
        return this.model.cells.getAll;
    }

    get getBlackCheck() {
        return this.model.checkAndMate.getBlackCheck;
    }

    get getWhiteCheck() {
        return this.model.checkAndMate.getWhiteCheck;
    }

    get getMate() {
        return this.model.checkAndMate.getMate;
    }

    get getStalemate() {
        return this.model.checkAndMate.getStalemate;
    }

    get getCurrentPlayerColor() {
        return this.model.players.getCurrent.color;
    }

    get getIsPromotedPawnObject() {
        return !!this.model.flags.getPawnObject;
    }

    get getPromotedPawnColor() {
        return this.model.flags.getPawnObject?.cell.cellFigure.getObject?.color;
    }

    get getBlackMoves() {
        return this.model.moves.black;
    }

    get getWhiteMoves() {
        return this.model.moves.white;
    }

    get getLostBlackFigures() {
        return this.model.lostFigures.black;
    }

    get getLostWhiteFigures() {
        return this.model.lostFigures.white;
    }

}