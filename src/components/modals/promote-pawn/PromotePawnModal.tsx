import { useContext } from 'react';
import { useSelector } from 'react-redux';
import black_bishop from '../../../assets/png/black-bishop.png';
import black_knight from '../../../assets/png/black-knight.png';
import black_queen from '../../../assets/png/black-queen.png';
import black_rook from '../../../assets/png/black-rook.png';
import white_bishop from '../../../assets/png/white-bishop.png';
import white_knight from '../../../assets/png/white-knight.png';
import white_queen from '../../../assets/png/white-queen.png';
import white_rook from '../../../assets/png/white-rook.png';
import { BoardContext } from '../../../board-context/board/BoardContext';
import { Colors, FigureNames } from '../../../chess-model';
import { getModalPromotePawn } from '../../../store/model/modal/modalsSelectors';
import ModalWindow from '../ModalWindow';
import st from './promote-pawn.module.css';
import { usePromotePawn } from './usePromotePawn';
import type { FC } from 'react';

const PromotePawnModal: FC = () => {

    const { board } = useContext(BoardContext);
    const promotedPawnColor = board.getPromotedPawnColor;
    const modalPromotePawn = useSelector(getModalPromotePawn);
    const promotePawn = usePromotePawn();

    return (
        <ModalWindow show={modalPromotePawn}
            setShow={null}
            title={'Choose the figure to promote your pawn'}
            action={null}
            btnName={''}
            closeBtn={false}
        >
            <div className={st.figure_buttons_block} >
                <div className={st.figure_button} >
                    <img src={promotedPawnColor === Colors.BLACK ? black_queen : white_queen}
                        alt="black_queen" onClick={() => promotePawn(FigureNames.QUEEN)} />
                </div >
                <div className={st.figure_button} >
                    <img src={promotedPawnColor === Colors.BLACK ? black_knight : white_knight}
                        alt="black_knight" onClick={() => promotePawn(FigureNames.KNIGHT)} />
                </div >
                <div className={st.figure_button} >
                    <img src={promotedPawnColor === Colors.BLACK ? black_bishop : white_bishop}
                        alt="black_bishop" onClick={() => promotePawn(FigureNames.BISHOP)} />
                </div >
                <div className={st.figure_button} >
                    <img src={promotedPawnColor === Colors.BLACK ? black_rook : white_rook}
                        alt="black_rook" onClick={() => promotePawn(FigureNames.ROOK)} />
                </div >
            </div >
        </ModalWindow >
    );
};

export default PromotePawnModal;
