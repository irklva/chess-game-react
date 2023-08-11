import React, {Dispatch, FC, SetStateAction} from "react";
import st from "./board-component.module.css";
import CellComponent from "../cell-component/CellComponent";
import {Cell} from "../../models/cell/Cell";
import {Board} from "../../models/board/Board";

interface BoardProps {
    board: Board;
    selectedCell: Cell | null;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
}

const BoardComponent: FC<BoardProps> = ({board, selectedCell, setSelectedCell}) => {

    return (
        <div>
            <div className={st.board}>
                {board.getCells.map((row: Cell[], index: number) => (
                    <React.Fragment key={index}>
                        {row.map(cell => (
                            <CellComponent
                                board={board}
                                selectedCell={selectedCell}
                                setSelectedCell={setSelectedCell}
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