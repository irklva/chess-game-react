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
    className,
    ...props
}) => {
    const buttonStyleClassCheck = () => {
        switch (buttonStyle) {
                case ButtonStyle.PRIMARY:
                    return st.primary;
                case ButtonStyle.SECONDARY:
                    return st.secondary;
                default:
                    return '';
        }
    };
    const buttonStyleClass = buttonStyleClassCheck();

    return (
        <button
            className={
                `${st.btn} ${buttonStyleClass} ${className}`
            }
            {...props} // eslint-disable-line react/jsx-props-no-spreading
        >
            {children}
        </button>
    );
};

export default AppButton;
