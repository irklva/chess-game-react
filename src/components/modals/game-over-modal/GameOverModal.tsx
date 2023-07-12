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
    whiteTimer: number | null;
    blackTimer: number | null;
}

const GameOverModal: FC<ModalsComponentProps> = ({
                                                     board,
                                                     setModalNewGame,
                                                     modalGameOver,
                                                     setModalGameOver,
                                                     whiteName,
                                                     blackName,
                                                     whiteTimer,
                                                     blackTimer
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
            {board.isMate && board.isWhiteCheck &&
                <>Mate! {blackName} wins</>
            }
            {board.isMate && board.isBlackCheck &&
                <>Mate! {whiteName} wins</>
            }
            {board.isStalemate &&
                <>Stalemate</>
            }
            {whiteTimer === 0 &&
                <>Time is over! {blackName} wins</>
            }
            {blackTimer === 0 &&
                <>Time is over! {whiteName} wins</>
            }
        </ModalWindow>
    );
};

export default GameOverModal;