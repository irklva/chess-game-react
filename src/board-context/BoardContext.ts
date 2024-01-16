import { createContext } from 'react';
import { Board } from '../chess-models';
import type { Cell } from '../chess-models';

export interface BoardContextProps {
    board: Board;
    setBoard: (board: Board) => void;
    selectedCell: Cell | null;
    setSelectedCell: (cell: Cell | null) => void;
}

const initialValues: BoardContextProps = {
    board: new Board(),
    setBoard: (_board: Board) => console.warn('Missing provider for setBoard in BoardContext'),
    selectedCell: null,
    setSelectedCell: (_cell) => console.warn('Missing provider for setSelectedCell in BoardContext')
};

export const BoardContext = createContext<BoardContextProps>(initialValues);
