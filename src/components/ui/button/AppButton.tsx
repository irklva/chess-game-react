import React, {FC, ReactNode, ButtonHTMLAttributes} from 'react';
import st from "./app-button.module.css";

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
                return st.primary
            case ButtonStyle.SECONDARY:
                return st.secondary
            default:
                return ''
        }
    }
    const buttonStyleClass = buttonStyleClassCheck();

    return (
        <button
            className={
                `${st.btn} ${buttonStyleClass} ${className}`
            }
            {...props}
        >
            {children}
        </button>
    );
};

export default AppButton;
