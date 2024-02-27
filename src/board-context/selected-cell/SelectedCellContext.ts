import { createContext } from 'react';
import type { Cell } from '../../chess-model';

export interface SelectedCellContextProps {
    selectedCell: Cell | null;
    setSelectedCell: (cell: Cell | null) => void;
}

const initialValues: SelectedCellContextProps = {
    selectedCell: null,
    setSelectedCell: (_cell) => console.warn('Missing provider for setSelectedCell in SelectedCellContext'),
};

export const SelectedCellContext = createContext<SelectedCellContextProps>(initialValues);
