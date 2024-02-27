import { useCallback, useContext } from 'react';
import { SelectedCellContext } from '../../board-context/selected-cell/SelectedCellContext';
import { Colors } from '../../chess-model';
import st from './cell-component.module.css';
import CellContent from './cell-content/CellContent';
import CellMarkers from './cell-markers/CellMarkers';
import { useCellClick } from './useCellClick';
import type { Cell } from '../../chess-model';
import type { FC } from 'react';

interface CellProps {
    cell: Cell;
}

const CellComponent: FC<CellProps> = ({ cell }) => {

    const { selectedCell } = useContext(SelectedCellContext);

    const handleClick = useCellClick(cell);
    const handleMemoClick = useCallback(
        (changeFigureDuringMove = true) => handleClick(changeFigureDuringMove),
        // cell in deps is needed for better rendering
        [cell], // eslint-disable-line react-hooks/exhaustive-deps
    );

    const isSelected = (cell.getX === selectedCell?.getX && cell.getY === selectedCell?.getY);
    const cellClasses = [
        st.cell,
        cell.getColor === Colors.BLACK ? st.black : st.white,
        isSelected ? st.selected : '',
    ];

    const handleDrop = () => {
        handleClick(false);
    };

    return (
        <div
            className={cellClasses.join(' ')}
            onClick={() => handleClick()}
            onDrop={handleDrop}
        >
            <CellContent
                cell={cell}
                handleClick={handleMemoClick}
            />
            <CellMarkers
                cell={cell}
                isSelected={isSelected}
            />
        </div>
    );
};

export default CellComponent;
