import {FigureModel, FigureNames} from "../../figures/functionality/FigureModel";
import {Queen} from "../../figures/functionality/all/Queen";
import {Knight} from "../../figures/functionality/all/Knight";
import {Rook} from "../../figures/functionality/all/Rook";
import {Bishop} from "../../figures/functionality/all/Bishop";
import {BoardCheckAndMate} from "./BoardCheckAndMate";
import {PawnPromo} from "../../interfaces/PawnPromo";
import {BoardModel} from "./BoardModel";

export enum CastlingNames {
    BIG = 'big',
    SMALL = 'small'
}


export class BoardFlags {
    private promoPawnObject: PawnPromo | null;
    private castling: CastlingNames | null;
    private readonly checkAndMate: BoardCheckAndMate;

    constructor(checkAndMate: BoardCheckAndMate,
                promoPawnObject: PawnPromo | null = null,
                castling: CastlingNames | null = null) {
        this.promoPawnObject = promoPawnObject;
        this.castling = castling;
        this.checkAndMate = checkAndMate;
    }

    private exhaustiveCheck(params: FigureNames) {
        console.log("Unexpected value " + params);
    }

    public promotePawn(type: FigureNames,
                       board: BoardModel,
                       blackTimer: number | null,
                       whiteTimer: number | null) {
        if (this.promoPawnObject &&
            this.promoPawnObject.cell.cellFigure.getObject?.getName === FigureNames.PAWN) {
            const pawnColor = this.promoPawnObject.cell.cellFigure.getObject.color;
            let newFigure: FigureModel | null = null;
            switch (type) {
                case FigureNames.QUEEN:
                    newFigure = new Queen(pawnColor,
                        this.promoPawnObject.cell);
                    break
                case FigureNames.KNIGHT:
                    newFigure = new Knight(pawnColor,
                        this.promoPawnObject.cell);
                    break
                case FigureNames.ROOK:
                    newFigure = new Rook(pawnColor,
                        this.promoPawnObject.cell);
                    break
                case FigureNames.BISHOP:
                    newFigure = new Bishop(pawnColor,
                        this.promoPawnObject.cell);
                    break
                default:
                    this.exhaustiveCheck(type);
            }
            board.players.swipePlayer();
            board.checkAndMate.checkUpd();
            board.checkAndMate.stalemateAndMateUpd();
            const promoMove = this.promoPawnObject.moveObject;
            promoMove.board = board.copyBoardDeep();
            promoMove.blackTimer = blackTimer;
            promoMove.whiteTimer = whiteTimer;
            promoMove.promoFigure = newFigure?.figure || null;
            board.moves.newMove = promoMove;
            this.promoPawnObject = null;
        }
    }

    get getPawnObject(): PawnPromo | null {
        return this.promoPawnObject;
    }

    set setPawnObject(object: PawnPromo) {
        this.promoPawnObject = object;
    }

    get getCastling(): CastlingNames | null {
        return this.castling;
    }

    set setCastling(castling: string | null) {
        if (castling === null || castling === CastlingNames.SMALL || castling === CastlingNames.BIG)
            this.castling = castling;
    }
}