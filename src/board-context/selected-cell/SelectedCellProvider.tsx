import { useState } from 'react';
import { SelectedCellContext } from './SelectedCellContext';
import type { Cell } from '../../chess-model';
import type { FC, ReactNode } from 'react';

interface BoardProviderProps {
    children: ReactNode
}

const SelectedCellProvider: FC<BoardProviderProps> = ({ children }) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    const defaultProps = {
        selectedCell: selectedCell,
        setSelectedCell: setSelectedCell,
    };

    return (
        <SelectedCellContext.Provider value={defaultProps} >
            {children}
        </SelectedCellContext.Provider >
    );
};

export default SelectedCellProvider;
