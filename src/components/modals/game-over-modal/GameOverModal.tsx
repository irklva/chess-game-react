import React, {Dispatch, FC, SetStateAction} from 'react';
import ModalWindow from "../modal-window/ModalWindow";
import {Board} from "../../../models/Board";

interface ModalsComponentProps {
    board: Board;
    setModalNewGame: Dispatch<SetStateAction<boolean>>;
    modalGameOver: boolean;
    setModalGameOver: Dispatch<SetStateAction<boolean>>;
    whiteName: string;
    blackName: string;
    timeWinner: string | null;
}

const GameOverModal: FC<ModalsComponentProps> = ({
                                                     board,
                                                     setModalNewGame,
                                                     modalGameOver,
                                                     setModalGameOver,
                                                     whiteName,
                                                     blackName,
                                                     timeWinner
                                                 }) => {

    function setNewGame() {
        setModalGameOver(false);
        setModalNewGame(true);
    }

    return (
        <ModalWindow show={modalGameOver}
                     setShow={setModalGameOver}
                     title={'Game over'}
                     action={setNewGame}
                     btnName={'New game'}
                     closeBtn={true}
        >
            {board.isMate && board.isWhiteCheck && !timeWinner &&
                <>Mate! {blackName} wins</>
            }
            {board.isMate && board.isBlackCheck && !timeWinner &&
                <>Mate! {whiteName} wins</>
            }
            {board.isStalemate && !timeWinner &&
                <>Stalemate</>
            }
            {timeWinner &&
                <>Time is over! {timeWinner} wins</>
            }
        </ModalWindow>
    );
};

export default GameOverModal;