import { Fragment } from 'react';
import { useBoard } from '../../board-context/useBoard';
import CellComponent from '../cell-component/CellComponent';
import st from './board-component.module.css';
import type { Cell } from '../../chess-models';
import type { FC } from 'react';

const BoardComponent: FC = () => {
    const { board } = useBoard();

    return (
        <div>
            <div className={st.board}>
                {board.getCells.map((row: Cell[], index: number) => (
                    <Fragment key={index}>
                        {row.map((cell) => (
                            <CellComponent
                                cell={cell}
                                key={cell.getID}
                            />
                        ))}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;
