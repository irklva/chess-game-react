import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { Colors } from '../../../chess-model';
import { getBlackName, getWhiteName } from '../../../store/model/players/playersSelectors';
import st from './player-and-losses.module.css';
import type { BlockOrder } from '../../../types/types';
import type { FC } from 'react';

interface LostFiguresProps {
    playerColor: Colors;
    order: BlockOrder;
}

const PlayerAndLosses: FC<LostFiguresProps> = ({ playerColor , order }) => {

    const { board, currentPlayerColor } = useContext(BoardContext);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);

    const figures = playerColor === Colors.BLACK ? board.getLostWhiteFigures : board.getLostBlackFigures;
    const playerName = playerColor === Colors.BLACK ? blackName : whiteName;

    return (
        <div className={`${st.main} ${st[order]}`} >
            <h5 className={playerColor === currentPlayerColor ? st.player + ' ' + st.active : st.player} >
                {playerName}
            </h5 >
            <div className={st.figures_block} >
                {figures.map(figure =>
                    <div key={figure.getId} className={st.figure} >
                        {figure.getLogo &&
                            <img src={figure.getLogo} alt={`${figure.getColor} ${figure.getName}`} />}
                    </div >)}
            </div >
        </div >
    );
};

export default PlayerAndLosses;
