import {RootState} from "../../store";
import {PlayersSchema} from "./playersSchema";

export const getBlackName = (state: RootState): PlayersSchema['blackName'] => state.players.blackName;
export const getWhiteName = (state: RootState): PlayersSchema['whiteName'] => state.players.whiteName;