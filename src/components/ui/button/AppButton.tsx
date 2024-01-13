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
    return (
        <button
            className={
                `${st.btn} 
                ${buttonStyle === ButtonStyle.SECONDARY ? st.secondary : st.primary} 
                ${className}`
            }
            {...props}
        >
            {children}
        </button>
    );
};

export default AppButton;
