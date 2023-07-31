import {FigureModel} from "../../models/figures/FigureModel";
import React, {FC} from "react";
import st from "./player-and-figures.module.css";
import {Colors} from "../../models/Colors";

interface LostFiguresProps {
    playerName: string;
    figures: FigureModel[];
    playerColor: Colors;
    currentPlayerColor: Colors;
}

const PlayerAndFigures: FC<LostFiguresProps> = ({
                                                    playerName,
                                                    figures,
                                                    playerColor,
                                                    currentPlayerColor
                                                }) => {
    return (
        <div className={st.player_block}>
            <h5 className={playerColor === currentPlayerColor ? st.player + ' ' + st.active : st.player}>
                {playerName}
            </h5>
            <div className={st.figures}>
                {figures.map(figure =>
                    <div key={figure.id} className={st.figure}>
                        {figure.getLogo &&
                            <img src={figure.getLogo} alt={`${figure.color} ${figure.getName}`}/>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(PlayerAndFigures);