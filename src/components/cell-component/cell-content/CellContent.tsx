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
