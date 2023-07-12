import {Cell} from "../../models/Cell";
import React, {FC} from "react";
import st from "./cell-component.module.css";
import {Colors} from "../../models/Colors";
import {FigureNames} from "../../models/figures/Figure";

interface CellProps {
    cell: Cell;
    selected: boolean;
    click: (cell: Cell) => void;
    whiteCheck: boolean;
    blackCheck: boolean;
    mate: boolean;
}

const CellComponent: FC<CellProps> = ({
                                          cell,
                                          selected,
                                          click,
                                          blackCheck,
                                          whiteCheck,
                                          mate
}) => {
    return (
        <div
            className={[st.cell,
                cell.color === Colors.BLACK ? st.black : st.white,
                cell.figure?.name === FigureNames.KING && cell.figure?.color === Colors.BLACK && blackCheck ? st.attacked : '',
                cell.figure?.name === FigureNames.KING && cell.figure?.color === Colors.WHITE && whiteCheck ? st.attacked : '',
                cell.figure?.color === Colors.BLACK && blackCheck && mate ? st.attacked : '',
                cell.figure?.color === Colors.WHITE && whiteCheck && mate ? st.attacked : '',
                selected ? st.selected : "",
                cell.available && cell.figure ? st.attacked : ""].join(' ')}
            onClick={() => click(cell)}
        >
            <div className={st.content}>
                {cell.available && !cell.figure && <div className={st.available}/>}
                {cell.figure?.logo && <img src={cell.figure.logo} alt=""/>}
                {cell.y === 7 &&
                    <div className={st.x}>
                        {cell.coordinates.x}
                    </div>
                }
                {cell.x === 0 &&
                    <div className={st.y}>
                        {cell.coordinates.y}
                    </div>
                }
            </div>
        </div>
    );
};

export default CellComponent;