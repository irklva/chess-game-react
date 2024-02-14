import type { Move } from './Move';
import type { CellModel } from '../cell/functionality/CellModel';

export interface PawnPromo {
    cell: CellModel;
    moveObject: Move;
}
