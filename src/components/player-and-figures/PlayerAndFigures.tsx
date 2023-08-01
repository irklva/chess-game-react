import React, {FC} from "react";
import st from "./player-and-figures.module.css";
import {Colors} from "../../models/Colors";
import {Figure} from "../../models/figures/Figure";

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
                                                    currentPlayerColor
                                                }) => {
    return (
        <div className={st.player_block}>
            <h5 className={playerColor === currentPlayerColor ? st.player + ' ' + st.active : st.player}>
                {playerName}
            </h5>
            <div className={st.figures}>
                {figures.map(figure =>
                    <div key={figure.getId} className={st.figure}>
                        {figure.getLogo &&
                            <img src={figure.getLogo} alt={`${figure.getColor} ${figure.getName}`}/>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlayerAndFigures;