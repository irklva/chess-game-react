import { Colors } from '../../Colors';
import type { BoardModel } from './BoardModel';
import type { Move } from '../../types/Move';

export class BoardMoves {
    readonly black: Move[];
    readonly white: Move[];

    constructor(black: Move[] = [], white: Move[] = []) {
        this.black = black;
        this.white = white;
    }

    newMovesArray(board: BoardModel, boardId: number, color: Colors) {
        const movesArray = color === Colors.BLACK ? this.black : this.white;
        let index = 0;
        movesArray.some(move => {
            if (move.board && move.board?.getId <= boardId) {
                index += 1;
                return false;
            } else {
                return true;
            }
        });
        movesArray.splice(index);
        if (index > 0 && movesArray[index - 1].board?.getId === boardId) {
            movesArray[index - 1].board = board.copyBoardDeep(false);
        }
    }

    set newMove(move: Move) {
        move.figure.getColor === Colors.BLACK ?
            this.black.push(move) :
            this.white.push(move);
    }
}
