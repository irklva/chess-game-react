import st from './app-input.module.css';
import type { FC, InputHTMLAttributes } from 'react';

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const AppInput: FC<AppInputProps> = ({
    className = '',
    ...props
}) => {
    return (
        <input
            className={`${st.main} ${className}`}
            {...props} // eslint-disable-line react/jsx-props-no-spreading
        />
    );
};

export default AppInput;
