import React, {Dispatch, FC, SetStateAction} from "react";
import st from "./cell-component.module.css";
import {Colors} from "../../models/Colors";
import {Cell} from "../../models/cell/Cell";
import {Board} from "../../models/board/Board";
import CellContent from "./cell-content/CellContent";
import {useCellClick} from "./useCellClick";

interface CellProps {
    board: Board;
    selectedCell: Cell | null;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
    cell: Cell;
}

const CellComponent: FC<CellProps> = ({
                                          board,
                                          selectedCell,
                                          setSelectedCell,
                                          cell
                                      }) => {

    const click = useCellClick(board, selectedCell, setSelectedCell, cell);

    const isSelected = (cell.getX === selectedCell?.getX && cell.getY === selectedCell?.getY);
    const cellClasses = [
        st.cell,
        cell.getColor === Colors.BLACK ? st.black : st.white,
        isSelected ? st.selected : ''
    ]

    return (
        <div
            className={cellClasses.join(' ')}
            onClick={click}
        >
            <CellContent
                board={board}
                cell={cell}
                isSelected={isSelected}
            />
        </div>
    );
};

export default CellComponent;