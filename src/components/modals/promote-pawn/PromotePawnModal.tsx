import React, {Dispatch, FC, SetStateAction} from 'react';
import st from "./promote-pown.module.css";
import {Colors} from "../../../models/Colors";
import black_queen from "../../../assets/black-queen.png";
import white_queen from "../../../assets/white-queen.png";
import {FigureNames} from "../../../models/figures/FigureModel";
import black_knight from "../../../assets/black-knight.png";
import white_knight from "../../../assets/white-knight.png";
import black_bishop from "../../../assets/black-bishop.png";
import white_bishop from "../../../assets/white-bishop.png";
import black_rook from "../../../assets/black-rook.png";
import white_rook from "../../../assets/white-rook.png";
import ModalWindow from "../ModalWindow";
import {useDispatch, useSelector} from "react-redux";
import {getModalPromotePawn, setModalGameOver, setModalPromotePawn} from "../../../store/reducers/modalsSlice";
import {Board} from "../../../models/board/Board";
import {Cell} from "../../../models/cell/Cell";
import {getBlackTimer, getWhiteTimer} from "../../../store/reducers/timersSlice";

interface PromotePawnProps {
    board: Board;
    setSelectedCell: Dispatch<SetStateAction<Cell | null>>;
}

const PromotePawnModal: FC<PromotePawnProps> = ({board, setSelectedCell}) => {

    const dispatch = useDispatch();
    const modalPromotePawn = useSelector(getModalPromotePawn);
    const blackTimer = useSelector(getBlackTimer);
    const whiteTimer = useSelector(getWhiteTimer);

    const promotePawn = (figure: FigureNames) => {
        board.promotePawn(figure, blackTimer, whiteTimer);
        dispatch(setModalPromotePawn(false));
        setSelectedCell(null);
        if (board.getMate || board.getStalemate) {
            dispatch(setModalGameOver(true));
        }
    }

    return (
        <ModalWindow show={modalPromotePawn}
                     setShow={null}
                     title={'Choose the figure to promote your pawn'}
                     action={null}
                     btnName={''}
                     closeBtn={false}
        >
            <div className={st.figure_btns}>
                <div className={st.figure_btn}>
                    <img src={board.getPromotedPawnCellColor === Colors.BLACK ? black_queen : white_queen}
                         alt="black_queen" onClick={() => promotePawn(FigureNames.QUEEN)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.getPromotedPawnCellColor === Colors.BLACK ? black_knight : white_knight}
                         alt="black_knight" onClick={() => promotePawn(FigureNames.KNIGHT)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.getPromotedPawnCellColor === Colors.BLACK ? black_bishop : white_bishop}
                         alt="black_bishop" onClick={() => promotePawn(FigureNames.BISHOP)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.getPromotedPawnCellColor === Colors.BLACK ? black_rook : white_rook}
                         alt="black_rook" onClick={() => promotePawn(FigureNames.ROOK)}/>
                </div>
            </div>
        </ModalWindow>
    );
};

export default PromotePawnModal;