import React, {FC} from "react";
import st from "./cell-component.module.css";
import {Colors} from "../../models/Colors";
import {Cell} from "../../models/cell/Cell";
import CellContent from "./cell-content/CellContent";
import {useCellClick} from "./useCellClick";
import {useBoard} from "../../board-context/useBoard";

interface CellProps {
    cell: Cell;
}

const CellComponent: FC<CellProps> = ({cell}) => {

    const {selectedCell} = useBoard();

    const click = useCellClick(cell);

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
                cell={cell}
                isSelected={isSelected}
            />
        </div>
    );
};

export default CellComponent;