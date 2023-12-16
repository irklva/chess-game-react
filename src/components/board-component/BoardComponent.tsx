import React, {FC} from "react";
import st from "./board-component.module.css";
import CellComponent from "../cell-component/CellComponent";
import {Cell} from "../../models/other/cell/Cell";
import {useBoard} from "../../board-context/useBoard";

const BoardComponent: FC = () => {

    const {board} = useBoard();

    return (
        <div>
            <div className={st.board}>
                {board.getCells.map((row: Cell[], index: number) => (
                    <React.Fragment key={index}>
                        {row.map(cell => (
                            <CellComponent
                                cell={cell}
                                key={cell.getID}
                            />
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;