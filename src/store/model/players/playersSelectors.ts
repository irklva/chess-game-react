import {RootState} from "../../store";

export const getBlackName = (state: RootState): string => state.players.blackName;
export const getWhiteName = (state: RootState): string => state.players.whiteName;