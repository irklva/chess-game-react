import { Modal } from 'react-bootstrap';
import AppButton, { ButtonStyle } from '../ui/button/AppButton';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';

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
    closeBtn,
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
                    <AppButton onClick={action}>
                        {btnName}
                    </AppButton>
                }
                {closeBtn &&
                    <AppButton onClick={handleClose} buttonStyle={ButtonStyle.SECONDARY}>
                        Close
                    </AppButton>
                }
            </Modal.Footer>
        </Modal>
    );
};

export default ModalWindow;
