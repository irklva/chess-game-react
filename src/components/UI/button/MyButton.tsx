import React, {FC, ReactNode} from 'react';
import st from "./my-button.module.css";

interface MyButtonProps {
    action: () => void;
    children: ReactNode;
    myType?: string;
}

const MyButton: FC<MyButtonProps> = ({action, children, myType= 'first'}) => {
    return (
        <button className={`${st.btn} ${myType === 'second' ? st.second : st.first}`} onClick={action}>
            {children}
        </button>
    );
};

export default MyButton;