import { Fragment, useContext, useEffect, useState } from 'react';
import { BoardContext } from '../../board-context/board/BoardContext';
import { SelectedCellContext } from '../../board-context/selected-cell/SelectedCellContext';
import CellComponent from '../cell-component/CellComponent';
import st from './board-component.module.css';
import type { Cell } from '../../chess-model';
import type { DragEvent, FC } from 'react';

const BoardComponent: FC = () => {
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
        selectedCell?.highLightMoveCells(true);
        setSelectedCell(null);
    }, [board]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <img
                id="ghost"
                alt="ghost"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            />
            <div
                className={st.main}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
            >
                {board.getCells.map((row: Cell[], index: number) => (
                    <Fragment key={index} >
                        {row.map((cell) => (
                            <CellComponent
                                cell={cell}
                                key={cell.getID}
                            />
                        ))}
                    </Fragment >
                ))}
            </div >
        </>
    );
};

export default BoardComponent;
