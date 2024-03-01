import { memo } from 'react';
import { nameSymbolsLimit } from '../../../../utils/constants';
import AppInput from '../../../ui/input/AppInput';
import st from './player-settings.module.css';
import type { ChangeEvent, FC } from 'react';

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
    setNewName,
}) => {

    return (
        <div className={st.main} >
            <label htmlFor={inputId} >
                {newNameLabel}
            </label >
            <div className={st.input} >
                <AppInput
                    id={inputId}
                    type="text"
                    value={newName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewName(e.target.value)}
                />
                {(newName === '' || newName.length > nameSymbolsLimit) &&
                    <div className={`text-danger ${st.message}`} >
                        1 - {nameSymbolsLimit} symbols
                    </div >
                }
            </div >
        </div >
    );
};

export default memo(PlayerSettings);
