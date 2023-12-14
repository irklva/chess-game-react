import React, {FC} from 'react';
import st from "./promote-pawn.module.css";
import {Colors} from "../../../models/Colors";
import black_queen from "../../../assets/black-queen.png";
import white_queen from "../../../assets/white-queen.png";
import {FigureNames} from "../../../models/figures/functionality/FigureModel";
import black_knight from "../../../assets/black-knight.png";
import white_knight from "../../../assets/white-knight.png";
import black_bishop from "../../../assets/black-bishop.png";
import white_bishop from "../../../assets/white-bishop.png";
import black_rook from "../../../assets/black-rook.png";
import white_rook from "../../../assets/white-rook.png";
import ModalWindow from "../ModalWindow";
import {useSelector} from "react-redux";
import {getModalPromotePawn} from "../../../store/reducers/modalsSlice";
import {PromotePawnProps} from "../../../types/types";
import {usePromotePawn} from "./usePromotePawn";

const PromotePawnModal: FC<PromotePawnProps> = ({board, setSelectedCell}) => {

    const modalPromotePawn = useSelector(getModalPromotePawn);
    const promotePawn = usePromotePawn({board, setSelectedCell})

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
                    <img src={board.getPromotedPawnColor === Colors.BLACK ? black_queen : white_queen}
                         alt="black_queen" onClick={() => promotePawn(FigureNames.QUEEN)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.getPromotedPawnColor === Colors.BLACK ? black_knight : white_knight}
                         alt="black_knight" onClick={() => promotePawn(FigureNames.KNIGHT)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.getPromotedPawnColor === Colors.BLACK ? black_bishop : white_bishop}
                         alt="black_bishop" onClick={() => promotePawn(FigureNames.BISHOP)}/>
                </div>
                <div className={st.figure_btn}>
                    <img src={board.getPromotedPawnColor === Colors.BLACK ? black_rook : white_rook}
                         alt="black_rook" onClick={() => promotePawn(FigureNames.ROOK)}/>
                </div>
            </div>
        </ModalWindow>
    );
};

export default PromotePawnModal;