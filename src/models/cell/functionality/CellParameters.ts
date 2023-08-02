import {Colors} from "../../Colors";
import {CellModel} from "./CellModel";
import {CellFigure} from "./CellFigure";
import {BoardCells} from "../../board/functionality/BoardCells";
import {FigureNames} from "../../figures/functionality/FigureModel";

export interface Coordinates {
    x: string,
    y: string
}

export class CellParameters {
    readonly x: number;
    readonly y: number;
    readonly coordinates: Coordinates;
    readonly color: Colors;
    readonly id: number; // react keys
    private available: boolean; // for a move
    private moveFrom: boolean;
    private moveTo: boolean;
    private readonly cell: CellModel;
    private readonly figure: CellFigure;
    private readonly boardCells: BoardCells;

    constructor(x: number, y: number, color: Colors, cell: CellModel, figure: CellFigure,
                boardCells: BoardCells, moveFrom: boolean, moveTo: boolean) {
        this.x = x;
        this.y = y;
        this.coordinates = {x: String.fromCharCode(97 + this.x), y: (8 - this.y).toString()}
        this.color = color;
        this.id = Math.random();
        this.available = false;
        this.moveFrom = moveFrom;
        this.moveTo = moveTo;
        this.cell = cell;
        this.figure = figure;
        this.boardCells = boardCells;
    }

    isEmptyVertical(target: CellModel): boolean {
        if (this.x !== target.parameters.x)
            return false;

        const min = Math.min(this.y, target.parameters.y);
        const max = Math.max(this.y, target.parameters.y);

        for (let y = min + 1; y < max; y++) {
            if (!this.boardCells.getModel(this.x, y).cellFigure.noFigure())
                return false;
        }
        return true;
    }

    isEmptyHorizontal(target: CellModel): boolean {
        if (this.y !== target.parameters.y)
            return false;

        const min = Math.min(this.x, target.parameters.x);
        const max = Math.max(this.x, target.parameters.x);

        for (let x = min + 1; x < max; x++) {
            if (!this.boardCells.getModel(x, this.y).cellFigure.noFigure())
                return false;
        }
        return true;
    }

    isEmptyDiagonal(target: CellModel): boolean {
        const absX = Math.abs(target.parameters.x - this.x);
        const absY = Math.abs(target.parameters.y - this.y);

        if (absX !== absY)
            return false;

        const dx = this.x < target.parameters.x ? 1 : -1;
        const dy = this.y < target.parameters.y ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.boardCells.getModel(this.x + dx * i,
                this.y + dy * i).cellFigure.noFigure())
                return false;
        }
        return true;
    }

    pawnCanAttack(target: CellModel, needEnemy: boolean, direction: number): boolean {
        return (target.parameters.y === this.y + direction
            && (target.parameters.x === this.x + 1 || target.parameters.x === this.x - 1)
            && (!needEnemy || this.figure.isEnemy(target)));
    }

    pawnCanMove(target: CellModel, isFirstStep: boolean, direction: number, firstStepDirection: number): boolean {
        if ((target.parameters.y === this.y + direction
                || (isFirstStep && (target.parameters.y === this.y + firstStepDirection)))
            && target.parameters.x === this.x
            && this.boardCells.getModel(target.parameters.x,
                target.parameters.y).cellFigure.noFigure()) {
            return (
                !(isFirstStep &&
                    !this.boardCells.getModel(this.x,
                        this.y + direction).cellFigure.noFigure())
            );
        }
        return this.pawnCanAttack(target, true, direction);
    }

    attacked(attackedPlayerColor: Colors): boolean {
        return this.boardCells.getModels.some((row) =>
            row.some((figureCell) => {
                if (figureCell.cellFigure.getObject?.color !== attackedPlayerColor) {
                    return figureCell.cellFigure.getObject?.getName === FigureNames.PAWN
                        ?
                        figureCell.parameters.pawnCanAttack(
                            this.cell,
                            false,
                            figureCell.cellFigure.getObject?.color === Colors.BLACK ? 1 : -1)
                        :
                        figureCell.cellFigure.getObject?.canMove(this.cell, false)
                } else {
                    return false;
                }
            })
        )
    }

    get getAvailable(): boolean {
        return this.available;
    }

    set setAvailable(available: boolean) {
        this.available = available;
    }

    get getMoveFrom(): boolean {
        return this.moveFrom;
    }

    set setMoveFrom(move: boolean) {
        this.moveFrom = move;
    }

    get getMoveTo(): boolean {
        return this.moveTo;
    }

    set setMoveTo(move: boolean) {
        this.moveTo = move;
    }
}