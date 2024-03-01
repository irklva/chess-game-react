import React from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../chess-model';
import { getAreCardsReversed } from '../../store/model/game-settings/gameSettingsSelectors';
import { BlockOrder } from '../../types/types';
import BoardComponent from './board-component/BoardComponent';
import PlayerAndLosses from './player-and-losses/PlayerAndLosses';

const BoardBlock = () => {
    const areCardsReversed = useSelector(getAreCardsReversed);

    return (
        <>
            <PlayerAndLosses
                playerColor={Colors.BLACK}
                order={areCardsReversed ? BlockOrder.MOVED_BOTTOM : BlockOrder.TOP}
            />
            <BoardComponent />
            <PlayerAndLosses
                playerColor={Colors.WHITE}
                order={areCardsReversed ? BlockOrder.MOVED_TOP : BlockOrder.BOTTOM}
            />
        </ >
    );
};

export default BoardBlock;
