import { Colors } from '../../Colors';
import { PlayerModel } from '../../PlayerModel';


export class BoardPlayers {
    readonly black: PlayerModel;
    readonly white: PlayerModel;
    private current: PlayerModel;

    constructor(
        blackPlayer: PlayerModel = new PlayerModel(Colors.BLACK),
        whitePlayer: PlayerModel = new PlayerModel(Colors.WHITE),
        currentColor: Colors = Colors.WHITE,
    ) {
        this.black = blackPlayer;
        this.white = whitePlayer;
        this.current = currentColor === Colors.BLACK ? this.black : this.white;
    }

    swipePlayer() {
        this.current.color === Colors.BLACK ?
            this.current = this.white :
            this.current = this.black;
    }

    get getCurrent(): PlayerModel {
        return this.current;
    }
}
