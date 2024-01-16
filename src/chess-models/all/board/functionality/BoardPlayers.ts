import { Colors } from '../../Colors';
import { Player } from '../../Player';


export class BoardPlayers {
    readonly black: Player;
    readonly white: Player;
    private current: Player;

    constructor(
        blackPlayer: Player = new Player(Colors.BLACK),
        whitePlayer: Player = new Player(Colors.WHITE),
        currentColor: Colors = Colors.WHITE
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

    get getCurrent(): Player {
        return this.current;
    }
}
