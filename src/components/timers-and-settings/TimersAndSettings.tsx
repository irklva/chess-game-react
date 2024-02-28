import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as SoundOff } from '../../assets/svg/sound-off.svg';
import { ReactComponent as SoundOn } from '../../assets/svg/sound-on.svg';
import { getGameSounds } from '../../store/model/game-settings/gameSettingsSelectors';
import { setSounds } from '../../store/model/game-settings/gameSettingsSlice';
import { setModalNewGame } from '../../store/model/modal/modalsSlice';
import { setTimers } from '../../store/model/timers/timersSlice';
import AppButton from '../ui/button/AppButton';
import AppSwitch from '../ui/switch/AppSwitch';
import Timers from './timers/Timers';
import st from './timers-and-settings.module.css';
import type { FC } from 'react';

const TimersAndSettings: FC = () => {

    const dispatch = useDispatch();
    const [isTimerVisible, setIsTimerVisible] = useState(true);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const sounds = useSelector(getGameSounds);

    const startNewGame = useCallback(() => {
        setIsTimerRunning(false);
        setIsTimerVisible(false);
        dispatch(setModalNewGame(true));
    }, [dispatch]);

    const enableInfiniteSeconds = useCallback(() => {
        dispatch(setTimers({
            blackTimer: null,
            whiteTimer: null,
        }));
    }, [dispatch]);

    const handleSetSounds = useCallback(() => {
        dispatch(setSounds());
    }, [dispatch]);

    return (
        <div className={`
            ${st.main}
            ${isTimerVisible ? '' : st.no_timers}
        `}>
            <div className={`${st.timer} ${isTimerVisible ? '' : st.collapsed}`}>
                <Timers
                    setIsTimerVisible={setIsTimerVisible}
                    isTimerRunning={isTimerRunning}
                    setIsTimerRunning={setIsTimerRunning}
                />
                <div className={`${st.infinity_btn} ${isTimerRunning ? '' : st.collapsed}`}>
                    <AppButton
                        onClick={enableInfiniteSeconds}
                    >
                        Infinite timers
                    </AppButton>
                </div>
            </div>
            <div className={st.settings}>
                <AppButton
                    onClick={startNewGame}
                >
                    New game
                </AppButton>
                <AppSwitch
                    switchId="sounds"
                    checked={sounds}
                    onChange={handleSetSounds}
                    SwitchOnSvg={SoundOn}
                    SwitchOffSvg={SoundOff}
                />
            </div>
        </div>
    );
};

export default TimersAndSettings;
