import { useBoard } from '../../board-context/useBoard';
import { Colors } from '../../chess-models';
import st from './cell-component.module.css';
import CellContent from './cell-content/CellContent';
import { useCellClick } from './useCellClick';
import type { Cell } from '../../chess-models';
import type { FC } from 'react';

interface CellProps {
    cell: Cell;
}

const CellComponent: FC<CellProps> = ({ cell }) => {

    const { selectedCell } = useBoard();

    const click = useCellClick(cell);

    const isSelected = (cell.getX === selectedCell?.getX && cell.getY === selectedCell?.getY);
    const cellClasses = [
        st.cell,
        cell.getColor === Colors.BLACK ? st.black : st.white,
        isSelected ? st.selected : '',
    ];

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
