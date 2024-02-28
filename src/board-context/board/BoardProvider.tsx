import { useState } from 'react';
import { Board, Colors } from '../../chess-model';
import { BoardContext } from './BoardContext';
import type { FC, ReactNode } from 'react';

interface BoardProviderProps {
    children: ReactNode
}

const BoardProvider: FC<BoardProviderProps> = ({ children }) => {

    const [board, setBoard] = useState(new Board());
    // state currentPlayerColor is for rendering optimization only
    // it is better to use board.getCurrentPlayerColor in components
    const [currentPlayerColor, setCurrentPlayerColor] = useState<Colors | null>(Colors.WHITE);

    const defaultProps = {
        board: board,
        setBoard: setBoard,
        currentPlayerColor: currentPlayerColor,
        setCurrentPlayerColor: setCurrentPlayerColor,
    };

    return (
        <BoardContext.Provider value={defaultProps} >
            {children}
        </BoardContext.Provider >
    );
};

export default BoardProvider;
