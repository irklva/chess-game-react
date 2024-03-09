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

    const [handleClick, handleMemoClick] = useCellClick(cell);

    return (
        <div
            className={st.main}
            onClick={() => handleClick(true)}
            onDrop={() => handleClick(false)}
        >
            <CellContent
                cell={cell}
                handleClick={handleMemoClick}
            />
            <CellMarkers
                cell={cell}
            />
        </div >
    );
};

export default CellComponent;
