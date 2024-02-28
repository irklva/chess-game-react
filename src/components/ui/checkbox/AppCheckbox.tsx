import st from './app-checkbox.module.css';
import type { FC, ReactNode } from 'react';

interface AppCheckboxProps {
    children?: ReactNode;
    checkboxId: string;
    className?: string;
    checked: boolean;
    onChange: () => void;
}

const AppCheckbox: FC<AppCheckboxProps> = ({
    children,
    className = '',
    checkboxId,
    checked,
    onChange,
}) => {
    return (
        <div className={`${st.main} ${className}`} >
            <label htmlFor={checkboxId} >
                {children}
                <input
                    id={checkboxId}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <span />
            </label >
        </div >
    );
};

export default AppCheckbox;
