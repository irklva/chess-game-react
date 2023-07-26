import React, {FC} from 'react';
import ModalWindow from "../ModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {getModalGameOver, setModalGameOver, setModalNewGame} from "../../../store/reducers/modalsSlice";
import {getBlackName, getWhiteName} from "../../../store/reducers/playersSlice";
import {getTimeWinner} from "../../../store/reducers/timersSlice";
import {Board} from "../../../models/board/Board";

interface GameOverProps {
    board: Board;
}

const GameOverModal: FC<GameOverProps> = ({board}) => {

    const dispatch = useDispatch();
    const modalGameOver = useSelector(getModalGameOver);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timeWinner = useSelector(getTimeWinner);

    const openNewGameWindow = () => {
        dispatch(setModalGameOver(false));
        dispatch(setModalNewGame(true));
    }

    return (
        <ModalWindow show={modalGameOver}
                     setShow={() => dispatch(setModalGameOver(false))}
                     title={'Game over'}
                     action={openNewGameWindow}
                     btnName={'New game'}
                     closeBtn={true}
        >
            {board.getMate && board.getWhiteCheck && !timeWinner &&
                <>Mate! {blackName} wins</>
            }
            {board.getMate && board.getBlackCheck && !timeWinner &&
                <>Mate! {whiteName} wins</>
            }
            {board.getStalemate && !timeWinner &&
                <>Stalemate</>
            }
            {timeWinner &&
                <>Time is over! {timeWinner} wins</>
            }
        </ModalWindow>
    );
};

export default GameOverModal;