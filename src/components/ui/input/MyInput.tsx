import {FC, InputHTMLAttributes} from 'react';
import st from './my-input.module.css';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const MyInput: FC<MyInputProps> = ({className, ...props}) => {
    return (
        <input
            className={`${st.input} ${className}`}
            {...props}
        />
    );
};

export default MyInput;