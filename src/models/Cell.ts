import {Colors} from "./Colors";
import {Figure, FigureNames} from "./figures/Figure";
import {Board} from "./Board";
import {Pawn} from "./figures/Pawn";
import {Rook} from "./figures/Rook";
import {Bishop} from "./figures/Bishop";
import {Knight} from "./figures/Knight";
import {Queen} from "./figures/Queen";
import {King} from "./figures/King";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly coordinates: { x: string, y: string };
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean; // for a move
    id: number; // react keys

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.coordinates = {x: String.fromCharCode(97 + this.x), y: (8 - this.y).toString()}
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    public setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    private getCopyFigure(figure: Figure, cell: Cell): Figure {
        switch (figure.name) {
            case FigureNames.PAWN:
                return new Pawn(figure.color, cell);
            case FigureNames.ROOK:
                return new Rook(figure.color, cell);
            case FigureNames.BISHOP:
                return new Bishop(figure.color, cell);
            case FigureNames.KNIGHT:
                return new Knight(figure.color, cell);
            case FigureNames.QUEEN:
                return new Queen(figure.color, cell);
            case FigureNames.KING:
                return new King(figure.color, cell);
            case FigureNames.FIGURE:
                return new Figure(figure.color, cell);
        }
    }

    public getCopyCell(board: Board, cell: Cell): Cell {
        const newCell = new Cell(
            board,
            cell.x,
            cell.y,
            cell.color,
            null
        );
        if (cell.figure) {
            newCell.figure = this.getCopyFigure(cell.figure, newCell);
        }
        return newCell;
    }

    private isEnemy(target: Cell): boolean {
        if (target.figure) {
            return target.figure?.color !== this.figure?.color;
        }
        return false;
    }

    private isEmpty(): boolean {
        return this.figure === null;
    }

    public isEmptyVertical(target: Cell): boolean {
        if (this.x !== target.x)
            return false;

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.board.getCell(this.x, y).isEmpty())
                return false;
        }
        return true;
    }

    public isEmptyHorizontal(target: Cell): boolean {
        if (this.y !== target.y)
            return false;

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.board.getCell(x, this.y).isEmpty())
                return false;
        }
        return true;
    }

    public isEmptyDiagonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);

        if (absX !== absY)
            return false;

        const dx = this.x < target.x ? 1 : -1;
        const dy = this.y < target.y ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty())
                return false;
        }
        return true;
    }

    private pawnCanAttack(target: Cell, needEnemy: boolean, direction: number): boolean {
        return (target.y === this.y + direction
            && (target.x === this.x + 1 || target.x === this.x - 1)
            && (!needEnemy || this.isEnemy(target)));
    }

    public pawnCanMove(target: Cell, isFirstStep: boolean, direction: number, firstStepDirection: number): boolean {
        if ((target.y === this.y + direction
                || isFirstStep && (target.y === this.y + firstStepDirection))
            && target.x === this.x
            && this.board.getCell(target.x, target.y).isEmpty()) {
            return (
                !(isFirstStep &&
                    !this.board.getCell(this.x, this.y + direction).isEmpty())
            );
        }
        return this.pawnCanAttack(target, true, direction);
    }

    public attackedCell(attackedPlayerColor: Colors) {
        return this.board.cells.some((row) =>
            row.some((figureCell) => {
                if (figureCell.figure?.color !== attackedPlayerColor) {
                    return (
                        figureCell.figure?.name === FigureNames.PAWN
                            ?
                            figureCell.pawnCanAttack(
                                this,
                                false,
                                figureCell.figure.color === Colors.BLACK ? 1 : -1)
                            :
                            figureCell.figure?.canMove(this, false)
                    )
                }
            })
        )
    }

    public moveFigure(target: Cell) {
        if (this.figure) {
            const move = {
                id: this.board.blackMoves.length + 1,
                from: this.coordinates.x.concat(this.coordinates.y),
                to: target.coordinates.x.concat(target.coordinates.y),
                figure: this.figure
            }
            this.figure.color === Colors.BLACK
                ?
                this.board.blackMoves.push(move)
                :
                this.board.whiteMoves.push(move)
            this.figure.moveFigure(target);
            if (target.figure) {
                this.board.addLostFigure(target.figure);
            }
            target.setFigure(this.figure);
            this.figure = null;
            this.board.swipePlayer();
            this.board.checkUpd();
            this.board.stalemateAndMateUpd();
        }
    }

    public isMoveDangerousForKing(target: Cell) {
        if (this.figure) {
            const tempBoard = this.board.getCopyBoard();
            const newTargetCell = this.getCopyCell(tempBoard, target);
            newTargetCell.setFigure(this.getCopyFigure(this.figure, newTargetCell));
            const newFigureCell = this.getCopyCell(tempBoard, this);
            newFigureCell.figure = null;
            tempBoard.cells[target.y][target.x] = newTargetCell;
            tempBoard.cells[this.y][this.x] = newFigureCell;
            if (this.figure.name === FigureNames.KING) {
                this.board.currentPlayer.color === Colors.BLACK
                    ?
                    tempBoard.blackKingCell = {x: target.x, y: target.y}
                    :
                    tempBoard.whiteKingCell = {x: target.x, y: target.y}
            }
            tempBoard.checkUpd();
            return this.board.currentPlayer.color === Colors.BLACK ? tempBoard.isBlackCheck : tempBoard.isWhiteCheck;
        }
    }

}