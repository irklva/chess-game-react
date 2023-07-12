import {Cell} from "./Cell";
import {Colors} from "./Colors";
import {Pawn} from "./figures/Pawn";
import {King} from "./figures/King";
import {Queen} from "./figures/Queen";
import {Bishop} from "./figures/Bishop";
import {Knight} from "./figures/Knight";
import {Rook} from "./figures/Rook";
import {Figure, FigureNames} from "./figures/Figure";
import {Player} from "./Player";

export class Board {
    flag: boolean = false;
    cells: Cell[][] = [];
    whiteMoves: { id: number, from: string, to: string, figure: Figure }[] = [];
    blackMoves: { id: number, from: string, to: string, figure: Figure }[] = [];
    whitePlayer: Player = new Player(Colors.WHITE);
    blackPlayer: Player = new Player(Colors.BLACK);
    currentPlayer: Player = this.whitePlayer;
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];
    blackKingCell: { x: number, y: number } = {x: 4, y: 0};
    whiteKingCell: { x: number, y: number } = {x: 4, y: 7};
    isBlackCheck: boolean = false;
    isWhiteCheck: boolean = false;
    isMate: boolean = false;
    isStalemate: boolean = false;
    promotedPawnCell: Cell | null = null;

    public initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null))
                } else {
                    row.push(new Cell(this, j, i, Colors.WHITE, null))
                }
            }
            this.cells.push(row);
        }
    }

    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.flag = true;

        const newCells: Cell[][] = [];
        for (let y = 0; y < this.cells.length; y++) {
            const xArray: Cell[] = []
            this.cells[y].forEach(x => {
                xArray.push(x.getCopyCell(newBoard, x))
            })
            newCells.push(xArray);
        }

        newBoard.cells = newCells;
        newBoard.currentPlayer = new Player(this.currentPlayer.color);
        newBoard.lostBlackFigures = this.lostBlackFigures.slice(0);
        newBoard.lostWhiteFigures = this.lostWhiteFigures.slice(0);
        newBoard.blackKingCell = {...this.blackKingCell};
        newBoard.whiteKingCell = {...this.whiteKingCell};
        newBoard.isBlackCheck = this.isBlackCheck;
        newBoard.isWhiteCheck = this.isWhiteCheck;
        return newBoard;
    }

    public highLightCells(selectedCell: Cell | null) {
        this.cells.forEach(row => {
            row.forEach(target => {
                target.available = !!selectedCell?.figure?.canMove(target);
            })
        })
    }

    private areAvailableCells(selectedCell: Cell) {
        return this.cells.some(row => {
            return row.some(target => {
                return selectedCell?.figure?.canMove(target) === true;
            })
        })
    }

    public swipePlayer() {
        this.currentPlayer.color === Colors.BLACK
            ?
            this.currentPlayer = this.whitePlayer
            :
            this.currentPlayer = this.blackPlayer
    }

    public addLostFigure(figure: Figure) {
        figure.color === Colors.WHITE
            ?
            this.lostWhiteFigures.push(figure)
            :
            this.lostBlackFigures.push(figure)
    }

    public getCell(x: number, y: number) {
        return this.cells[y][x];
    }

    public checkUpd() {
        this.isBlackCheck = this.getCell(this.blackKingCell.x, this.blackKingCell.y).attackedCell(Colors.BLACK);
        this.isWhiteCheck = this.getCell(this.whiteKingCell.x, this.whiteKingCell.y).attackedCell(Colors.WHITE);
    }

    private areActiveCells() {
        return this.cells.some(row => {
            return row.some(target => {
                if (target.figure?.color !== this.currentPlayer.color)
                    return false;
                return this.areAvailableCells(target);
            })
        });
    }

    public stalemateAndMateUpd() {
        if (!this.areActiveCells()) {
            if (this.isBlackCheck || this.isWhiteCheck) {
                this.isMate = true;
            } else {
                this.isStalemate = true;
            }
        }
    }

    public promotePawn(type: FigureNames) {
        if (this.promotedPawnCell && this.promotedPawnCell.figure) {
            switch (type) {
                case FigureNames.QUEEN:
                    new Queen(this.promotedPawnCell.figure.color, this.promotedPawnCell);
                    break
                case FigureNames.KNIGHT:
                    new Knight(this.promotedPawnCell.figure.color, this.promotedPawnCell);
                    break
                case FigureNames.ROOK:
                    new Rook(this.promotedPawnCell.figure.color, this.promotedPawnCell);
                    break
                case FigureNames.BISHOP:
                    new Bishop(this.promotedPawnCell.figure.color, this.promotedPawnCell);
                    break
            }
            this.promotedPawnCell = null;
        }
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.WHITE, this.getCell(i, 6));
            new Pawn(Colors.BLACK, this.getCell(i, 1));
        }
    }

    private addKings() {
        new King(Colors.WHITE, this.getCell(4, 7));
        new King(Colors.BLACK, this.getCell(4, 0));
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getCell(3, 0));
        new Queen(Colors.WHITE, this.getCell(3, 7));
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(2, 0));
        new Bishop(Colors.WHITE, this.getCell(2, 7));
        new Bishop(Colors.BLACK, this.getCell(5, 0));
        new Bishop(Colors.WHITE, this.getCell(5, 7));
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(1, 0));
        new Knight(Colors.WHITE, this.getCell(1, 7));
        new Knight(Colors.BLACK, this.getCell(6, 0));
        new Knight(Colors.WHITE, this.getCell(6, 7));
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0, 0));
        new Rook(Colors.WHITE, this.getCell(0, 7));
        new Rook(Colors.BLACK, this.getCell(7, 0));
        new Rook(Colors.WHITE, this.getCell(7, 7));
    }

    public addFigures() {
        this.addPawns();
        this.addKings();
        this.addQueens();
        this.addBishops();
        this.addKnights();
        this.addRooks();
    }

}