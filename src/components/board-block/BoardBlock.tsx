import React from 'react';
import { useSelector } from 'react-redux';
import { Colors } from '../../chess-model';
import { getIsBoardReversed } from '../../store/model/game-settings/gameSettingsSelectors';
import { BlockOrder } from '../../types/types';
import BoardComponent from './board-component/BoardComponent';
import PlayerAndLosses from './player-and-losses/PlayerAndLosses';

const BoardBlock = () => {
    const isBoardReversed = useSelector(getIsBoardReversed);

    return (
        <>
            <PlayerAndLosses
                playerColor={Colors.BLACK}
                order={isBoardReversed ? BlockOrder.BOTTOM : BlockOrder.TOP}
            />
            <BoardComponent />
            <PlayerAndLosses
                playerColor={Colors.WHITE}
                order={isBoardReversed ? BlockOrder.TOP : BlockOrder.BOTTOM}
            />
        </ >
    );
};

export default BoardBlock;
