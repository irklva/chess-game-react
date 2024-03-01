import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../../chess-model';
import { getIsBoardReversed } from '../../../store/model/game-settings/gameSettingsSelectors';
import st from './cell-content.module.css';
import type { Cell } from '../../../chess-model';
import type { FC } from 'react';


interface CellContentProps {
    cell: Cell;
    handleClick: () => void;
}

const CellContent: FC<CellContentProps> = ({ cell, handleClick }) => {

    const isBoardReversed = useSelector(getIsBoardReversed);

    function handleDragStart() {
        handleClick();
    }

    const xCoordinatesClasses = [
        st.coordinate,
        cell.getColor === Colors.WHITE ? st.black : st.white,
        isBoardReversed ? st.x_reversed : st.x,
    ];

    const yCoordinatesClasses = [
        st.coordinate,
        cell.getColor === Colors.WHITE ? st.black : st.white,
        isBoardReversed ? st.y_reversed : st.y,
    ];

    return (
        <>
            {cell.getY === 7 &&
                <div
                    className={xCoordinatesClasses.join(' ')}
                >
                    {cell.getChessCoordinates?.x}
                </div >
            }
            {cell.getX === 0 &&
                <div
                    className={yCoordinatesClasses.join(' ')}
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
