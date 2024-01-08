import {BoardCells} from "./BoardCells";
import {BoardPlayers} from "./BoardPlayers";
import {BoardCheckAndMate} from "./BoardCheckAndMate";
import {BoardMoves} from "./BoardMoves";
import {BoardLostFigures} from "./BoardLostFigures";
import {Board} from "../Board";
import {BoardKings} from "./BoardKings";
import {BoardFlags} from "./BoardFlags";
import {FigureNames} from "../../figures/functionality/FigureModel";

export class BoardModel {
    private id: number;
    private deepCopy: boolean;
    readonly cells: BoardCells;
    readonly kings: BoardKings;
    readonly players: BoardPlayers;
    readonly checkAndMate: BoardCheckAndMate;
    readonly flags: BoardFlags;
    readonly moves: BoardMoves;
    readonly lostFigures: BoardLostFigures;

    constructor(
        players: BoardPlayers = new BoardPlayers(),
        deepCopy: boolean = false,
        id: number = 0,
        moves: BoardMoves = new BoardMoves(),
        lostFigures: BoardLostFigures = new BoardLostFigures(),
        cells: BoardCells = new BoardCells(),
        kings: BoardKings = new BoardKings(),
        checkAndMate: BoardCheckAndMate = new BoardCheckAndMate(cells, kings, players),
        flags: BoardFlags = new BoardFlags(checkAndMate)
    ) {
        this.id = id;
        this.deepCopy = deepCopy;
        this.cells = cells;
        this.kings = kings;
        this.players = players;
        this.checkAndMate = checkAndMate;
        this.flags = flags;
        this.moves = moves;
        this.lostFigures = lostFigures;
    }

    public initBaseline() {
        this.cells.initCells(this);
        this.cells.addFigures();
    }

    copyBoardDeep(newId: boolean = true): Board {
        const newPlayers = new BoardPlayers(
            this.players.black,
            this.players.white,
            this.players.getCurrent.color
        )
        const newMoves = new BoardMoves(
            this.moves.black,
            this.moves.white
        )
        const newLostFigures = new BoardLostFigures(
            this.lostFigures.black.slice(0),
            this.lostFigures.white.slice(0)
        )
        const boardModel = new BoardModel(
            newPlayers,
            true,
            newId ? this.id + 1 : this.id,
            newMoves,
            newLostFigures
        );
        const newCells = this.cells.copyAllCells(boardModel);
        boardModel.cells.setAll = newCells.cells;
        boardModel.cells.setModels = newCells.cellsModels;
        boardModel.kings.setBlackKing = {...this.kings.getBlackKing};
        boardModel.kings.setWhiteKing = {...this.kings.getWhiteKing};
        boardModel.checkAndMate.setBlackCheck = this.checkAndMate.getBlackCheck;
        boardModel.checkAndMate.setWhiteCheck = this.checkAndMate.getWhiteCheck;
        boardModel.checkAndMate.setMate = this.checkAndMate.getMate;
        boardModel.checkAndMate.setStalemate = this.checkAndMate.getStalemate;
        this.id = this.id + 1;
        return new Board(boardModel);
    }

    copyBoardModelForMoves(): BoardModel {
        const newBoard = new BoardModel(
            new BoardPlayers(
                this.players.black,
                this.players.white,
                this.players.getCurrent.color
            ),
            true
        );
        newBoard.cells.setModels = this.cells.copyAllCells(newBoard).cellsModels;
        newBoard.kings.setBlackKing = {...this.kings.getBlackKing};
        newBoard.kings.setWhiteKing = {...this.kings.getWhiteKing};
        return newBoard;
    }

    public promotePawn(figure: FigureNames,
                       blackTimer: number | null,
                       whiteTimer: number | null) {
        this.flags.promotePawn(figure, this, blackTimer, whiteTimer);
    }

    get getId(): number {
        return this.id;
    }

    get isDeepCopy(): boolean {
        return this.deepCopy;
    }

    notCopy() {
        this.deepCopy = false;
    }
}