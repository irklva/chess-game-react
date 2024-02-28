import { memo } from 'react';
import { Colors } from '../../../chess-model';
import st from './cell-content.module.css';
import type { Cell } from '../../../chess-model';
import type { FC } from 'react';


interface CellContentProps {
    cell: Cell;
    handleClick: () => void;
}

const CellContent: FC<CellContentProps> = ({ cell, handleClick }) => {

    function handleDragStart() {
        handleClick();
    }

    const movedCell = (cell.getMoveFrom || cell.getMoveTo) &&
        !(cell.getAvailable && cell.getFigureName);

    return (
        <>
            {cell.getY === 7 &&
                <div
                    className={`${st.coordinate} ${cell.getColor === Colors.WHITE ? st.black : st.white} ${st.x}`}
                >
                    {cell.getChessCoordinates?.x}
                </div >
            }
            {cell.getX === 0 &&
                <div
                    className={`${st.coordinate} ${cell.getColor === Colors.WHITE ? st.black : st.white} ${st.y}
                    `}
                >
                    {cell.getChessCoordinates?.y}
                </div >
            }
            {movedCell &&
                <div className={st.moved} />
            }
            {cell.getFigureLogo &&
                <img
                    src={cell.getFigureLogo}
                    alt={`${cell.getFigureColor} ${cell.getFigureName}`}
                    className={st.figure}
                    draggable={true}
                    onDragStart={handleDragStart}
                />
            }
        </>
    );
};

export default memo(CellContent);
