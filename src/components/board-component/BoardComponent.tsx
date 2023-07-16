import { Board } from "../../models/Board";
import React, { Dispatch, FC, SetStateAction } from "react";
import { Cell } from "../../models/Cell";
import st from "./board-component.module.css";
import CellComponent from "../cell-component/CellComponent";

interface BoarderProps {
    board: Board;
    selectedCell: Cell | null;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
    setModalGameOver: Dispatch<SetStateAction<boolean>>;
    setModalPromotePawn: Dispatch<SetStateAction<boolean>>;
    timeWinner: string | null;
}

const BoardComponent: FC<BoarderProps> = ({
                                              board,
                                              selectedCell,
                                              setSelectedCell,
                                              setModalGameOver,
                                              setModalPromotePawn,
                                              timeWinner
                                          }) => {
    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            board.highLightCells(null);
            selectedCell.moveFigure(cell);
            if (board.promotedPawnCell) {
                setModalPromotePawn(true);
            }
            if (board.isMate || board.isStalemate || timeWinner) {
                setModalGameOver(true);
            }
            setSelectedCell(null);
        } else if (selectedCell === cell) {
            board.highLightCells(null);
            setSelectedCell(null);
        } else if (cell.figure?.color === board.currentPlayer?.color) {
            board.highLightCells(cell);
            setSelectedCell(cell);
        }
    }

    return (
        <div>
            <div data-proportion-h="1" className={st.board}>
                {board.cells.map((row, index) => (
                    <React.Fragment key={index}>
                        {row.map(cell => (
                            <CellComponent
                                click={click}
                                cell={cell}
                                whiteCheck={board.isWhiteCheck}
                                blackCheck={board.isBlackCheck}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                mate={board.isMate}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;