import React, {Dispatch, FC, SetStateAction} from 'react';
import st from "./promote-pown.module.css";
import {Colors} from "../../../models/Colors";
import black_queen from "../../../assets/black-queen.png";
import white_queen from "../../../assets/white-queen.png";
import {FigureNames} from "../../../models/figures/Figure";
import black_knight from "../../../assets/black-knight.png";
import white_knight from "../../../assets/white-knight.png";
import black_bishop from "../../../assets/black-bishop.png";
import white_bishop from "../../../assets/white-bishop.png";
import black_rook from "../../../assets/black-rook.png";
import white_rook from "../../../assets/white-rook.png";
import ModalWindow from "../modal-window/ModalWindow";
import {Board} from "../../../models/Board";

interface ModalsComponentProps {
    board: Board;
    modalPromotePawn: boolean;
    setModalPromotePawn: Dispatch<SetStateAction<boolean>>;
}

const PromotePawnModal: FC<ModalsComponentProps> = ({
    board,
    modalPromotePawn,
    setModalPromotePawn
                                                    }) => {

    function promotePawn(figure: FigureNames) {
        board.promotePawn(figure);
        board.checkUpd();
        board.stalemateAndMateUpd();
        setModalPromotePawn(false);
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
                    <img src={board.promotedPawnCell?.figure?.color === Colors.BLACK ? black_queen : white_queen}
                         alt="black_queen" onClick={() => promotePawn(FigureNames.QUEEN)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.promotedPawnCell?.figure?.color === Colors.BLACK ? black_knight : white_knight}
                         alt="black_knight" onClick={() => promotePawn(FigureNames.KNIGHT)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.promotedPawnCell?.figure?.color === Colors.BLACK ? black_bishop : white_bishop}
                         alt="black_bishop" onClick={() => promotePawn(FigureNames.BISHOP)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.promotedPawnCell?.figure?.color === Colors.BLACK ? black_rook : white_rook}
                         alt="black_rook" onClick={() => promotePawn(FigureNames.ROOK)}/>
                </div>
            </div>
        </ModalWindow>
    );
};

export default PromotePawnModal;