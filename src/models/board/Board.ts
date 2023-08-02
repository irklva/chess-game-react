import {BoardModel} from "./functionality/BoardModel";
import {FigureNames} from "../figures/functionality/FigureModel";
import {Cell} from "../cell/Cell";
import {Colors} from "../Colors";
import {Move} from "../interfaces/Move";
import {Figure} from "../figures/Figure";

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

    get getId(): number {
        return this.model.getId;
    }

    get getCells(): Cell[][] {
        return this.model.cells.getAll;
    }

    get getBlackCheck(): boolean {
        return this.model.checkAndMate.getBlackCheck;
    }

    get getWhiteCheck(): boolean {
        return this.model.checkAndMate.getWhiteCheck;
    }

    get getMate(): boolean {
        return this.model.checkAndMate.getMate;
    }

    get getStalemate(): boolean {
        return this.model.checkAndMate.getStalemate;
    }

    get getCurrentPlayerColor(): Colors {
        return this.model.players.getCurrent.color;
    }

    get getIsPromotedPawnObject(): boolean {
        return !!this.model.flags.getPawnObject;
    }

    get getPromotedPawnColor(): Colors | null {
        return this.model.flags.getPawnObject?.cell.cellFigure.getObject?.color || null;
    }

    get getBlackMoves(): Move[] {
        return this.model.moves.black;
    }

    get getWhiteMoves(): Move[] {
        return this.model.moves.white;
    }

    get getLostBlackFigures(): Figure[] {
        return this.model.lostFigures.black;
    }

    get getLostWhiteFigures(): Figure[] {
        return this.model.lostFigures.white;
    }

}