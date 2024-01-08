import {Pawn} from "../../figures/functionality/all/Pawn";
import {Colors} from "../../Colors";
import {King} from "../../figures/functionality/all/King";
import {Queen} from "../../figures/functionality/all/Queen";
import {Bishop} from "../../figures/functionality/all/Bishop";
import {Knight} from "../../figures/functionality/all/Knight";
import {Rook} from "../../figures/functionality/all/Rook";
import {BoardModel} from "./BoardModel";
import {Cell} from "../../cell/Cell";
import {CellModel} from "../../cell/functionality/CellModel";

interface CellsCopy {
    cells: Cell[][],
    cellsModels: CellModel[][]
}

export class BoardCells {
    private all: Cell[][];
    private models: CellModel[][];

    constructor(cells: Cell[][] = [], cellModels: CellModel[][] = []) {
        this.all = cells;
        this.models = cellModels;
    }

    initCells(board: BoardModel) {
        for (let i = 0; i < 8; i++) {
            const modelsRow: CellModel[] = [];
            const cellsRow: Cell[] = [];
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 !== 0) {
                    const cellModel = new CellModel(board, j, i, Colors.BLACK);
                    const cell = new Cell(cellModel);
                    modelsRow.push(cellModel);
                    cellsRow.push(cell);
                } else {
                    const cellModel = new CellModel(board, j, i, Colors.WHITE);
                    const cell = new Cell(cellModel);
                    modelsRow.push(cellModel);
                    cellsRow.push(cell);
                }
            }
            this.all.push(cellsRow);
            this.models.push(modelsRow);
        }
    }

    getModel(x: number, y: number): CellModel {
        return this.models[y][x];
    }

    setModel(x: number, y: number, cellModel: CellModel) {
        this.models[y][x] = cellModel;
    }

    copyAllCells(newBoard: BoardModel): CellsCopy {
        const newModelsArray: CellModel[][] = [];
        const newCellsArray: Cell[][] = [];
        for (let y = 0; y < this.models.length; y++) {
            const xModelsArray: CellModel[] = [];
            const xCellsArray: Cell[] = [];
            this.models[y].forEach(x => {
                const newCell = x.copy(newBoard);
                xModelsArray.push(newCell.cellModel);
                xCellsArray.push(newCell.cell);
            })
            newModelsArray.push(xModelsArray);
            newCellsArray.push(xCellsArray);
        }
        return {cells: newCellsArray, cellsModels: newModelsArray};
    }

    private addPawns() {
        for (let i = 0; i < 8; i++) {
            new Pawn(Colors.WHITE, this.getModel(i, 6));
            new Pawn(Colors.BLACK, this.getModel(i, 1));
        }
    }

    private addKings() {
        new King(Colors.WHITE, this.getModel(4, 7));
        new King(Colors.BLACK, this.getModel(4, 0));
    }

    private addQueens() {
        new Queen(Colors.BLACK, this.getModel(3, 0));
        new Queen(Colors.WHITE, this.getModel(3, 7));
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getModel(2, 0));
        new Bishop(Colors.WHITE, this.getModel(2, 7));
        new Bishop(Colors.BLACK, this.getModel(5, 0));
        new Bishop(Colors.WHITE, this.getModel(5, 7));
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getModel(1, 0));
        new Knight(Colors.WHITE, this.getModel(1, 7));
        new Knight(Colors.BLACK, this.getModel(6, 0));
        new Knight(Colors.WHITE, this.getModel(6, 7));
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getModel(0, 0));
        new Rook(Colors.WHITE, this.getModel(0, 7));
        new Rook(Colors.BLACK, this.getModel(7, 0));
        new Rook(Colors.WHITE, this.getModel(7, 7));
    }

    addFigures() {
        this.addPawns();
        this.addKings();
        this.addQueens();
        this.addBishops();
        this.addKnights();
        this.addRooks();
    }

    get getAll(): Cell[][] {
        return this.all;
    }

    set setAll(cells: Cell[][]) {
        this.all = cells;
    }

    get getModels(): CellModel[][] {
        return this.models;
    }

    set setModels(models: CellModel[][]) {
        this.models = models;
    }
}