import React, {FC, ReactNode} from 'react';
import st from './app-checkbox.module.css';

interface AppCheckboxProps {
    children: ReactNode;
    checkboxId: string;
    className?: string;
    checked: boolean;
    onChange: () => void;
}

const AppInput: FC<AppCheckboxProps> = ({
                                            children,
                                            className,
                                            checkboxId,
                                            checked,
                                            onChange
                                        }) => {
    return (
        <div className={`${st.checkbox} ${className}`}>
            <label htmlFor={checkboxId}>
                {children}
                <input
                    id={checkboxId}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                />
                <span></span>
            </label>
        </div>
    );
};

export default AppInput;