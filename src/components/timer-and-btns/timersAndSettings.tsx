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
import Timer from './timer/Timer';
import st from './timers-and-settings.module.css';
import type { FC } from 'react';

const TimersAndSettings: FC = () => {

    const dispatch = useDispatch();
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const sounds = useSelector(getGameSounds);

    const newGame = useCallback(() => {
        dispatch(setModalNewGame(true));
        setIsTimerRunning(false);
    }, [dispatch]);

    const infiniteSeconds = useCallback(() => {
        dispatch(setTimers({
            blackTimer: null,
            whiteTimer: null,
        }));
    }, [dispatch]);

    return (
        <div className={`
            ${st.timer_and_settings_block}
            ${isTimerRunning ? '' : st.no_timers}
        `}>
            <div className={`${st.timer_block} ${isTimerRunning ? '' : st.collapsed}`}>
                <Timer
                    isTimerRunning={isTimerRunning}
                    setIsTimerRunning={setIsTimerRunning}
                />
                <AppButton
                    onClick={infiniteSeconds}
                >
                    Infinite timers
                </AppButton>
            </div>
            <div className={st.settings_block}>
                <AppButton
                    onClick={newGame}
                >
                    New game
                </AppButton>
                <AppSwitch
                    switchId="sounds"
                    checked={sounds}
                    onChange={() => dispatch(setSounds())}
                    SwitchOnSvg={SoundOn}
                    SwitchOffSvg={SoundOff}
                />
            </div>
        </div>
    );
};

export default TimersAndSettings;
