import {Colors} from "../../Colors";
import {BoardCells} from "./BoardCells";
import {BoardPlayers} from "./BoardPlayers";
import {BoardKings} from "./BoardKings";
import {CellModel} from "../../cell/functionality/CellModel";

export class BoardCheckAndMate {
    private isBlackCheck: boolean;
    private isWhiteCheck: boolean;
    private isMate: boolean;
    private isStalemate: boolean;
    readonly cells: BoardCells;
    readonly kings: BoardKings;
    readonly players: BoardPlayers;

    constructor(cells: BoardCells,
                kings: BoardKings,
                players: BoardPlayers,
                blackCheck: boolean = false,
                whiteCheck: boolean = false,
                mate: boolean = false,
                stalemate: boolean = false) {
        this.cells = cells;
        this.kings = kings;
        this.players = players;
        this.isBlackCheck = blackCheck;
        this.isWhiteCheck = whiteCheck;
        this.isMate = mate;
        this.isStalemate = stalemate;
    }

    checkUpd() {
        const blackKingCell = this.cells.getModel(this.kings.getBlackKing.x, this.kings.getBlackKing.y);
        const whiteKingCell = this.cells.getModel(this.kings.getWhiteKing.x, this.kings.getWhiteKing.y);

        this.isBlackCheck = blackKingCell.parameters.attacked(Colors.BLACK);
        this.isWhiteCheck = whiteKingCell.parameters.attacked(Colors.WHITE);
    }

    private areCellsForMove(selectedCell: CellModel): boolean {
        return this.cells.getModels.some(row => {
            return row.some(target => {
                return selectedCell?.cellFigure.getObject?.canMove(target) === true;
            })
        })
    }

    private areActiveCells(): boolean {
        return this.cells.getModels.some(row => {
            return row.some(target => {
                if (target.cellFigure.getObject?.color !== this.players.getCurrent.color)
                    return false;
                return this.areCellsForMove(target);
            })
        });
    }

    stalemateAndMateUpd() {
        if (!this.areActiveCells()) {
            if (this.isBlackCheck || this.isWhiteCheck) {
                this.isMate = true;
            } else {
                this.isStalemate = true;
            }
        }
    }

    get getBlackCheck(): boolean {
        return this.isBlackCheck;
    }

    set setBlackCheck(blackCheck: boolean) {
        this.isBlackCheck = blackCheck;
    }

    get getWhiteCheck(): boolean {
        return this.isWhiteCheck;
    }

    set setWhiteCheck(whiteCheck: boolean) {
        this.isWhiteCheck = whiteCheck;
    }

    get getMate(): boolean {
        return this.isMate;
    }

    set setMate(mate: boolean) {
        this.isMate = mate;
    }

    get getStalemate(): boolean {
        return this.isStalemate;
    }

    set setStalemate(stalemate: boolean) {
        this.isStalemate = stalemate;
    }
}