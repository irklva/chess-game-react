import {createContext} from "react";
import {Board} from "../models/board/Board";
import {Cell} from "../models/other/cell/Cell";

export interface BoardContextProps {
    board: Board;
    setBoard: (board: Board) => void;
    selectedCell: Cell | null;
    setSelectedCell: (cell: Cell | null) => void;
}

const initialValues: BoardContextProps = {
    board: new Board(),
    setBoard: (board) => console.warn(`Missing provider for setBoard in BoardContext`),
    selectedCell: null,
    setSelectedCell: (cell) => console.warn(`Missing provider for setSelectedCell in BoardContext`)
}

export const BoardContext = createContext<BoardContextProps>(initialValues);