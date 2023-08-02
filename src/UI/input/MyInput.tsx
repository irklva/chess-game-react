import React from 'react';
import st from './my-input.module.css';

const MyInput = ({...props}) => {
    return (
        <input className={st.input}
            {...props}
        />
    );
};

export default MyInput;