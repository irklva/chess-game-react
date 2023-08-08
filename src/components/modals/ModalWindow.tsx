import React, {Dispatch, FC, ReactNode, SetStateAction} from 'react';
import {Modal} from "react-bootstrap";
import MyButton from "../UI/button/MyButton";

interface ModalProps {
    show: boolean;
    setShow: Dispatch<SetStateAction<boolean>> | null;
    title: string;
    children: ReactNode;
    action: null | (() => void);
    btnName: string;
    closeBtn: boolean;
}

const ModalWindow: FC<ModalProps> = ({
                                         show,
                                         setShow,
                                         title,
                                         children,
                                         action,
                                         btnName,
                                         closeBtn
                                     }) => {

    function handleClose() {
        if (setShow) {
            setShow(false);
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {action &&
                    <MyButton action={action}>
                        {btnName}
                    </MyButton>
                }
                {closeBtn &&
                    <MyButton action={handleClose} myType={'second'}>
                        Close
                    </MyButton>
                }
            </Modal.Footer>
        </Modal>
    );
};

export default ModalWindow;