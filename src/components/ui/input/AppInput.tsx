import {FC, InputHTMLAttributes} from 'react';
import st from './app-input.module.css';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const AppInput: FC<AppInputProps> = ({className, ...props}) => {
    return (
        <input
            className={`${st.input} ${className}`}
            {...props}
        />
    );
};

export default AppInput;