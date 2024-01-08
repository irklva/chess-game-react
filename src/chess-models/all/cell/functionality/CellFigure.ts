import {FigureModel, FigureNames} from "../../figures/functionality/FigureModel";
import {CellModel} from "./CellModel";
import {Colors} from "../../Colors";
import {BoardModel} from "../../board/functionality/BoardModel";
import {Move} from "../../interfaces/Move";
import {Pawn} from "../../figures/functionality/all/Pawn";
import {Rook} from "../../figures/functionality/all/Rook";
import {Bishop} from "../../figures/functionality/all/Bishop";
import {Knight} from "../../figures/functionality/all/Knight";
import {Queen} from "../../figures/functionality/all/Queen";
import {King} from "../../figures/functionality/all/King";

export class CellFigure {
    private object: FigureModel | null;
    private readonly cell: CellModel;
    private readonly board: BoardModel;

    constructor(cell: CellModel, board: BoardModel) {
        this.object = null;
        this.cell = cell;
        this.board = board;
    }

    isEnemy(target: CellModel): boolean {
        if (target.cellFigure.object) {
            return target.cellFigure.object.color !== this.object?.color;
        }
        return false;
    }

    noFigure(): boolean {
        return this.object === null;
    }

    private cellsPreparation(target: CellModel): string {
        const figures: CellModel[] = [];
        let difX: string = "";
        let difY: string = "";
        this.board.cells.getModels.forEach(row => {
            row.forEach(cell => {
                cell.parameters.setMoveFrom = false;
                cell.parameters.setMoveTo = false;
                const cellFigure = cell.cellFigure.object;
                if (cellFigure?.color === this.object?.color &&
                    cellFigure?.getName === this.object?.getName &&
                    cellFigure?.canMove(target, true) &&
                    cell !== this.cell
                ) {
                    figures.push(cell);
                }
            })
        })
        figures.some((figure) => {
            const figureCoordinates = this.cell.parameters.coordinates;
            if (figure.parameters.coordinates.x !== figureCoordinates.x)
                difX = figureCoordinates.x;
            else
                difY = figureCoordinates.y;
            return (difX && difY);
        })
        return (difX + difY);
    }

    private moveFlags(target: CellModel, moveObject: Move) {
        if (target.cellFigure.object) {
            this.board.lostFigures.addLostFigure(target.cellFigure.object.figure);
            moveObject.attack = true;
        }
        if (this.board.flags.getCastling) {
            moveObject.castling = this.board.flags.getCastling;
            this.board.flags.setCastling = null;
        }
        if (this.object?.getName === FigureNames.PAWN &&
            ((this.object?.color === Colors.WHITE &&
                    target.parameters.y === 0) ||
                (this.object?.color === Colors.BLACK &&
                    target.parameters.y === 7))) {
            this.board.flags.setPawnObject = {
                cell: target,
                moveObject: moveObject
            };
        }
    }

    private relocateObject(target: CellModel) {
        target.cellFigure.setObject = this.object;
        this.object = null;
    }

    public move(target: CellModel,
                blackTimer: number | null,
                whiteTimer: number | null) {
        const targetParams = target.parameters;
        if (this.object && targetParams.getAvailable) {
            const boardMoves = this.board.moves;
            if (this.board.isDeepCopy) {
                const boardId = this.board.getId;
                boardMoves.newMovesArray(this.board, boardId, Colors.BLACK);
                boardMoves.newMovesArray(this.board, boardId, Colors.WHITE);
                this.board.notCopy();
            }
            const sameCoordinates = this.cellsPreparation(target);
            const moveObject: Move = {
                id: boardMoves.black.length + 1,
                figure: this.object.figure,
                to: sameCoordinates +
                    targetParams.coordinates.x +
                    targetParams.coordinates.y,
                attack: false,
                castling: null,
                board: null,
                blackTimer: blackTimer,
                whiteTimer: whiteTimer,
                promoFigure: null
            }
            this.object.moveFigure(target);
            this.moveFlags(target, moveObject);
            this.relocateObject(target);
            this.cell.parameters.setMoveFrom = true;
            targetParams.setMoveTo = true;
            if (!this.board.flags.getPawnObject) {
                this.board.players.swipePlayer();
                this.board.checkAndMate.checkUpd();
                this.board.checkAndMate.stalemateAndMateUpd();
                moveObject.board = this.board.copyBoardDeep();
                boardMoves.newMove = moveObject;
            }
        }
    }

    isMoveDangerousForKing(target: CellModel): boolean {
        if (this.object) {
            const tempBoard = this.board.copyBoardModelForMoves();
            const newTargetModel = target.copy(tempBoard).cellModel;
            const newFigureModel = this.cell.copy(tempBoard).cellModel;
            if (newFigureModel.cellFigure.object) {
                newTargetModel.cellFigure.object = newFigureModel.cellFigure.object;
            }
            newFigureModel.cellFigure.object = null;
            tempBoard.cells.setModel(target.parameters.x, target.parameters.y, newTargetModel);
            tempBoard.cells.setModel(this.cell.parameters.x, this.cell.parameters.y, newFigureModel);
            if (this.object.getName === FigureNames.KING) {
                tempBoard.kings.kingMove(target, this.board.players.getCurrent.color);
            }
            tempBoard.checkAndMate.checkUpd();
            return this.board.players.getCurrent.color === Colors.BLACK
                ?
                tempBoard.checkAndMate.getBlackCheck
                :
                tempBoard.checkAndMate.getWhiteCheck
        } else {
            return false;
        }
    }

    public highLightMoveCells(resetAvailable: boolean) {
        this.board.cells.getModels.forEach(row => {
            row.forEach(cell => {
                cell.parameters.setAvailable = (!resetAvailable && !!this.object?.canMove(cell));
            })
        })
    }

    private exhaustiveCheck(params: CellModel) {
        console.log("Unexpected value " + params);
    }

    getCopyFigure(cell: CellModel): FigureModel | null {
        const isFirstStep = this.object?.getFirstStep;

        switch (this.object?.getName) {
            case FigureNames.PAWN:
                return new Pawn(this.object.color, cell, isFirstStep);
            case FigureNames.ROOK:
                return new Rook(this.object.color, cell, isFirstStep);
            case FigureNames.BISHOP:
                return new Bishop(this.object.color, cell);
            case FigureNames.KNIGHT:
                return new Knight(this.object.color, cell);
            case FigureNames.QUEEN:
                return new Queen(this.object.color, cell);
            case FigureNames.KING:
                return new King(this.object.color, cell, isFirstStep);
            default:
                this.exhaustiveCheck(cell);
                return null;
        }
    }

    get getObject(): FigureModel | null {
        return this.object;
    }

    set setObject(object: FigureModel | null) {
        this.object = object;
        if (this.object) {
            this.object.setCell = this.cell;
        }
    }
}