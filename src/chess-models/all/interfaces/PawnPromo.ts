import {CellModel} from "../cell/functionality/CellModel";
import {Move} from "./Move";

export interface PawnPromo {
    cell: CellModel;
    moveObject: Move;
}