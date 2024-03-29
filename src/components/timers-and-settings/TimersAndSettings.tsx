import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ReverseSvg } from '../../assets/svg/reverse.svg';
import { ReactComponent as SoundOffSvg } from '../../assets/svg/sound-off.svg';
import { ReactComponent as SoundOnSvg } from '../../assets/svg/sound-on.svg';
import { getAreSounds } from '../../store/model/game-settings/gameSettingsSelectors';
import { setBoardReversing, setIsBoardReversed, setSounds } from '../../store/model/game-settings/gameSettingsSlice';
import { setModalNewGame } from '../../store/model/modal/modalsSlice';
import { setTimers } from '../../store/model/timers/timersSlice';
import { boardAnimationTime } from '../../utils/constants';
import AppButton from '../ui/button/AppButton';
import AppSwitch from '../ui/switch/AppSwitch';
import Timers from './timers/Timers';
import st from './timers-and-settings.module.css';
import type { FC } from 'react';

const TimersAndSettings: FC = () => {

    const dispatch = useDispatch();
    const [isTimerVisible, setIsTimerVisible] = useState(true);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const sounds = useSelector(getAreSounds);
    const timer = useRef<null | ReturnType<typeof setTimeout>>(null);

    const startNewGame = useCallback(() => {
        setIsTimerRunning(false);
        setIsTimerVisible(false);
        dispatch(setModalNewGame(true));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const enableInfiniteSeconds = useCallback(() => {
        dispatch(setTimers({
            blackTimer: null,
            whiteTimer: null,
        }));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSetSounds = useCallback(() => {
        dispatch(setSounds());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleSetIsBoardReversed = useCallback(() => {
        dispatch(setBoardReversing(true));
        timer.current = setTimeout(() => {
            dispatch(setIsBoardReversed());
            dispatch(setBoardReversing(false));
        }, boardAnimationTime);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let currentTimer = timer.current;

        return () => {
            if (currentTimer) {
                clearInterval(currentTimer);
            }
        };
    }, []);

    return (
        <div className={`${st.main} ${isTimerVisible ? '' : st.no_timers}`} >
            <div className={`${st.timer} ${isTimerVisible ? '' : st.collapsed}`} >
                <Timers
                    setIsTimerVisible={setIsTimerVisible}
                    isTimerRunning={isTimerRunning}
                    setIsTimerRunning={setIsTimerRunning}
                />
                <div className={`${st.infinity_btn} ${isTimerRunning ? '' : st.collapsed}`} >
                    <AppButton
                        onClick={enableInfiniteSeconds}
                    >
                        Infinite timers
                    </AppButton >
                </div >
            </div >
            <div className={st.options} >
                <AppButton
                    onClick={startNewGame}
                >
                    New game
                </AppButton >
                <div className={st.settings} >
                    <AppSwitch
                        switchId="sounds"
                        checked={sounds}
                        onChange={handleSetSounds}
                        SwitchOnSvg={SoundOnSvg}
                        SwitchOffSvg={SoundOffSvg}
                    />
                    <AppButton
                        onClick={handleSetIsBoardReversed}
                    >
                        <ReverseSvg className={st.left_icon} />
                    </AppButton >
                </div >
            </div >
        </div >
    );
};

export default TimersAndSettings;
