import {useContext} from "react";
import {BoardContext} from "./BoardContext";
import {Board} from "../models/board/Board";
import {Move} from "../models/interfaces/Move";
import {Cell} from "../models/cell/Cell";

interface UseBoardResult {
    board: Board;
    selectedCell: Cell | null;
    setSelectedCell: (cell: Cell | null) => void;
    boardSettings: () => void;
    changeBoard: (move: Move) => void;
}

export function useBoard(): UseBoardResult {
    const {board, setBoard, selectedCell, setSelectedCell} = useContext(BoardContext);

    const boardSettings = () => {
        const newBoard = new Board();
        newBoard.initBaseLine();
        setBoard(newBoard);
        setSelectedCell(null);
    }

    const changeBoard = (move: Move) => {
        if (move.board) {
            selectedCell?.highLightMoveCells(true);
            setSelectedCell(null);
            setBoard(move.board);
        }
    }

    return {board, selectedCell, setSelectedCell, boardSettings, changeBoard}
}