import st from './player-and-figures.module.css';
import type { Colors, Figure } from '../../chess-model';
import type { FC } from 'react';

interface LostFiguresProps {
    playerName: string;
    figures: Figure[];
    playerColor: Colors;
    currentPlayerColor: Colors;
}

const PlayerAndFigures: FC<LostFiguresProps> = ({
    playerName,
    figures,
    playerColor,
    currentPlayerColor,
}) => {

    return (
        <div className={st.main} >
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

export default PlayerAndFigures;
