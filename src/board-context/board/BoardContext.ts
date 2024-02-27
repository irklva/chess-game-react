import { createContext } from 'react';
import { Board, Colors } from '../../chess-model';

export interface BoardContextProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayerColor: Colors | null;
    setCurrentPlayerColor: (color: Colors | null) => void;
}

const initialValues: BoardContextProps = {
    board: new Board(),
    setBoard: (_board: Board) => console.warn('Missing provider for setBoard in BoardContext'),
    currentPlayerColor: Colors.WHITE,
    setCurrentPlayerColor: (_color: Colors | null) => console.warn('Missing provider for setBoard in BoardContext'),
};

export const BoardContext = createContext<BoardContextProps>(initialValues);
