import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../../chess-model';
import { getBoardReversing, getIsBoardReversed } from '../../../store/model/game-settings/gameSettingsSelectors';
import st from './cell-content.module.css';
import type { Cell } from '../../../chess-model';
import type { FC } from 'react';


interface CellContentProps {
    cell: Cell;
    handleClick: () => void;
}

const CellContent: FC<CellContentProps> = ({ cell, handleClick }) => {

    const isBoardReversed = useSelector(getIsBoardReversed);
    const boardReversing = useSelector(getBoardReversing);

    function handleDragStart() {
        handleClick();
    }

    const xCoordinatesClasses = [
        st.coordinate,
        boardReversing ? st.reversing : '',
        cell.getColor === Colors.WHITE ? st.black : st.white,
        isBoardReversed ? st.x_reversed : st.x,
    ];

    const yCoordinatesClasses = [
        st.coordinate,
        boardReversing ? st.reversing : '',
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
                    className={`${st.figure} ${boardReversing ? st.reversing : ''}`}
                    draggable={true}
                    onDragStart={handleDragStart}
                />
            }
        </>
    );
};

export default memo(CellContent);
