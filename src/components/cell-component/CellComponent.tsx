import { useBoard } from '../../board-context/useBoard';
import { Colors } from '../../chess-model';
import st from './cell-component.module.css';
import CellContent from './cell-content/CellContent';
import { useCellClick } from './useCellClick';
import type { Cell } from '../../chess-model';
import type { DragEvent , FC } from 'react';

interface CellProps {
    cell: Cell;
}

const CellComponent: FC<CellProps> = ({ cell }) => {

    const { selectedCell } = useBoard();

    const handleClick = useCellClick(cell);

    const isSelected = (cell.getX === selectedCell?.getX && cell.getY === selectedCell?.getY);
    const cellClasses = [
        st.cell,
        cell.getColor === Colors.BLACK ? st.black : st.white,
        isSelected ? st.selected : '',
    ];

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        handleClick(false);
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div
            className={cellClasses.join(' ')}
            onClick={() => handleClick()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <CellContent
                cell={cell}
                isSelected={isSelected}
                handleClick={handleClick}
            />
        </div>
    );
};

export default CellComponent;
