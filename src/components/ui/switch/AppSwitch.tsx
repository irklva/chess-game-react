import React, { memo } from 'react';
import st from './app-switch.module.css';
import type { FC, ReactNode, SVGProps } from 'react';

interface SwitchProps {
    children?: ReactNode;
    switchId: string;
    className?: string;
    checked: boolean;
    onChange: () => void;
    SwitchOnSvg: FC<SVGProps<SVGSVGElement>>;
    SwitchOffSvg: FC<SVGProps<SVGSVGElement>>;
}

const AppSwitch: FC<SwitchProps> = ({
    children,
    className = '',
    switchId,
    checked,
    onChange,
    SwitchOnSvg,
    SwitchOffSvg,
}) => {
    return (
        <div className={st.main} >
            <label className={`${st.label} ${className}`} >
                {children}
                <input
                    type="checkbox"
                    id={switchId}
                    checked={checked}
                    onChange={onChange}
                />
                <span className={`${st.slider} ${st.round}`} />
                <SwitchOnSvg className={st.left_icon} />
                <SwitchOffSvg className={st.right_icon} />
            </label >
        </div >
    );
};

export default memo(AppSwitch);
