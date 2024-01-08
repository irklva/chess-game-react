import React, {FC, ReactNode, ButtonHTMLAttributes} from 'react';
import st from "./my-button.module.css";

export enum ButtonType {
    FIRST = 'first',
    SECOND = 'second'
}

interface MyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    myBtnType?: ButtonType;
}

const MyButton: FC<MyButtonProps> = ({
                                         children,
                                         myBtnType = ButtonType.FIRST,
                                         className,
                                         ...props
                                     }) => {
    return (
        <button
            className={
                `${st.btn} 
                ${myBtnType === ButtonType.SECOND ? st.second : st.first} 
                ${className}`
            }
            {...props}
        >
            {children}
        </button>
    );
};

export default MyButton;
