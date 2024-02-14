import { useState } from 'react';
import { Board } from '../chess-model';
import { BoardContext } from './BoardContext';
import type { Cell } from '../chess-model';
import type { FC, ReactNode } from 'react';

interface BoardProviderProps {
    children: ReactNode
}

const BoardProvider: FC<BoardProviderProps> = ({ children }) => {

    const [board, setBoard] = useState(new Board());
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const defaultProps = {
        board: board,
        setBoard: setBoard,
        selectedCell: selectedCell,
        setSelectedCell: setSelectedCell,
    };

    return (
        <BoardContext.Provider value={defaultProps}>
            {children}
        </BoardContext.Provider>
    );
};

export default BoardProvider;
