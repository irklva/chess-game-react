import { memo } from 'react';
import st from './app-button.module.css';
import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';

export enum ButtonStyle {
    PRIMARY = 'primary',
    SECONDARY = 'secondary'
}

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    buttonStyle?: ButtonStyle;
}

const AppButton: FC<AppButtonProps> = ({
    children,
    buttonStyle = ButtonStyle.PRIMARY,
    className = '',
    ...props
}) => {

    return (
        <button
            className={
                `${st.main} ${st[buttonStyle]} ${className}`
            }
            {...props} // eslint-disable-line react/jsx-props-no-spreading
        >
            {children}
        </button>
    );
};

export default memo(AppButton);
