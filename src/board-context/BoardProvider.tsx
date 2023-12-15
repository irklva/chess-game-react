import {FC, useState, ReactNode} from 'react';
import {Board} from "../models/board/Board";
import {Cell} from "../models/cell/Cell";
import {BoardContext} from "./BoardContext";

type BoardProviderProps = {
    children: ReactNode
}

const BoardProvider: FC<BoardProviderProps> = ({children}) => {

    const [board, setBoard] = useState(new Board());
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const defaultProps = {
        board: board,
        setBoard: setBoard,
        selectedCell: selectedCell,
        setSelectedCell: setSelectedCell
    }

    return (
        <BoardContext.Provider value={defaultProps}>
            {children}
        </BoardContext.Provider>
    );
}

export default BoardProvider;