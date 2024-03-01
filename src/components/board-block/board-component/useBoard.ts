import { useContext, useEffect, useState } from 'react';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { SelectedCellContext } from '../../../board-context/selected-cell/SelectedCellContext';
import type { Cell } from '../../../chess-model';
import type { DragEvent } from 'react';

export const useBoard = (setReversedSells: (value: Cell[][] | null) => void) => {
    const { board } = useContext(BoardContext);
    const { selectedCell, setSelectedCell } = useContext(SelectedCellContext);
    const [startingX, setStartingX] = useState(0);
    const [startingY, setStartingY] = useState(0);
    let clientX = 0;
    let clientY = 0;

    function handleDragStart(e: DragEvent<HTMLImageElement>) {
        const draggedItem = e.target as HTMLImageElement; // change if necessary
        const dragImg = document.getElementById('ghost');
        if (dragImg) {
            e.dataTransfer?.setDragImage(dragImg, 0, 0);
        }
        setStartingX(e.clientX - draggedItem.offsetLeft);
        setStartingY(e.clientY - draggedItem.offsetTop);
    }

    function handleDragOver(e: DragEvent<HTMLImageElement>) {
        e.preventDefault();
        clientX = e.clientX;
        clientY = e.clientY;
    }

    function handleDrag(e: DragEvent<HTMLImageElement>) {
        const draggedItem = e.target as HTMLImageElement; // change if necessary
        if (draggedItem) {
            draggedItem.style.pointerEvents = 'none';
            draggedItem.style.zIndex = '100';
            draggedItem.style.transition = 'unset';
            draggedItem.style.left = (clientX - startingX) + 'px';
            draggedItem.style.top = (clientY - startingY) + 'px';
        }
    }

    function handleDragEnd(e: DragEvent<HTMLImageElement>) {
        const draggedItem = e.target as HTMLImageElement; // change if necessary
        if (draggedItem) {
            draggedItem.removeAttribute('style');
        }
    }

    useEffect(() => {
        setReversedSells(null);
        selectedCell?.highLightMoveCells(true);
        setSelectedCell(null);
    }, [board]); // eslint-disable-line react-hooks/exhaustive-deps

    return {
        handleDragStart,
        handleDragOver,
        handleDrag,
        handleDragEnd,
    };
};
