import React, {FC} from 'react';
import st from './player-settings.module.css';
import MyInput from "../../../UI/input/MyInput";
import {nameSymbolsLimit} from "../../../../utils/newGameConstants";

interface PlayerSettingsProps {
    inputId: string;
    newNameLabel: string;
    newName: string;
    setNewName: (name: string) => void;
}

const PlayerSettings: FC<PlayerSettingsProps> = ({
                                                     inputId,
                                                     newNameLabel,
                                                     newName,
                                                     setNewName
                                                 }) => {

    return (
        <div className={st.block}>
            <label htmlFor={inputId}>{newNameLabel}</label>
            <div className={st.input}>
                <MyInput id={inputId} type="text" value={newName}
                         onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                />
                {(newName === '' || newName.length > nameSymbolsLimit) &&
                    <div className={`text-danger ${st.message}`}>
                        1 - {nameSymbolsLimit} symbols
                    </div>
                }
            </div>
        </div>
    );
};

export default PlayerSettings;