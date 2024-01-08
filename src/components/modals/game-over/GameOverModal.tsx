import React, {FC} from 'react';
import ModalWindow from "../ModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {useBoard} from "../../../board-context/useBoard";
import {getModalGameOver} from "../../../store/reducers/modal/modalsSelectors";
import {setModalGameOver, setModalNewGame} from "../../../store/reducers/modal/modalsReducer";
import {getBlackName, getWhiteName} from "../../../store/reducers/players/playersSelectors";
import {getTimeWinner} from "../../../store/reducers/timers/timersSelectors";

const GameOverModal: FC = () => {

    const dispatch = useDispatch();
    const {board} = useBoard();
    const modalGameOver = useSelector(getModalGameOver);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timeWinner = useSelector(getTimeWinner);

    const openNewGameModal = () => {
        dispatch(setModalGameOver(false));
        dispatch(setModalNewGame(true));
    }

    return (
        <ModalWindow show={modalGameOver}
                     setShow={() => dispatch(setModalGameOver(false))}
                     title={'Game over'}
                     action={openNewGameModal}
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