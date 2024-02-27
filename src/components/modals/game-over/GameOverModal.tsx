import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { getModalGameOver } from '../../../store/model/modal/modalsSelectors';
import { setModalGameOver, setModalNewGame } from '../../../store/model/modal/modalsSlice';
import { getBlackName, getWhiteName } from '../../../store/model/players/playersSelectors';
import { getTimeWinner } from '../../../store/model/timers/timersSelectors';
import ModalWindow from '../ModalWindow';
import type { FC } from 'react';

const GameOverModal: FC = () => {

    const dispatch = useDispatch();
    const { board } = useContext(BoardContext);
    const modalGameOver = useSelector(getModalGameOver);
    const blackName = useSelector(getBlackName);
    const whiteName = useSelector(getWhiteName);
    const timeWinner = useSelector(getTimeWinner);

    const openNewGameModal = () => {
        dispatch(setModalGameOver(false));
        dispatch(setModalNewGame(true));
    };

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
