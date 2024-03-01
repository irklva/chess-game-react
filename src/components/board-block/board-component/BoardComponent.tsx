import { Fragment, useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { getIsBoardReversed } from '../../../store/model/game-settings/gameSettingsSelectors';
import CellComponent from '../../cell-component/CellComponent';
import st from './board-component.module.css';
import { useBoard } from './useBoard';
import type { Cell } from '../../../chess-model';
import type { FC } from 'react';

const BoardComponent: FC = () => {
    const { board } = useContext(BoardContext);
    const isBoardReversed = useSelector(getIsBoardReversed);
    const [reversedSells, setReversedSells] = useState<Cell[][] | null>(null);

    const {
        handleDragStart,
        handleDrag,
        handleDragOver,
        handleDragEnd,
    } = useBoard(setReversedSells);

    const cellsFragment = useMemo(() => {
        let cells;
        if (isBoardReversed && !reversedSells) {
            const reversedRows = board.getCells.slice(0).reverse();
            cells = reversedRows.map(row => row.slice(0).reverse());
        } else {
            cells = board.getCells;
        }

        return (
            cells.map((row: Cell[], index: number) => (
                <Fragment key={index} >
                    {row.map((cell) => (
                        <CellComponent
                            cell={cell}
                            key={cell.getID}
                        />
                    ))}
                </Fragment >
            ))
        );
    }, [isBoardReversed, reversedSells, board]);

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
                {cellsFragment}
            </div >
        </>
    );
};

export default BoardComponent;
