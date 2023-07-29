import {FigureModel} from "../../models/figures/FigureModel";
import React, {FC} from "react";
import st from "./player-and-figures.module.css";
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";

interface LostFiguresProps {
    playerName: string;
    figures: FigureModel[];
    playerColor: Colors;
    currentPlayer: Player;
}

const PlayerAndFigures: FC<LostFiguresProps> = ({
                                                    playerName,
                                                    figures,
                                                    playerColor,
                                                    currentPlayer
                                                }) => {
    return (
        <div className={st.player_block}>
            <h5 className={playerColor === currentPlayer.color ? st.player + ' ' + st.active : st.player}>
                {playerName}
            </h5>
            <div className={st.figures}>
                {figures.map(figure =>
                    <div key={figure.id} className={st.figure}>
                        {figure.getLogo &&
                            <img src={figure.getLogo} alt={figure.getName}/>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default React.memo(PlayerAndFigures);