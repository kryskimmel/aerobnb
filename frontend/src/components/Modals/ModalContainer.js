import React from "react";
import useModal from "../../context/OpenModalContext";

const ModalContainer = () => {
    const {onModalContent} = useModal();

    if (onModalContent) {
        return (
            <div>{onModalContent}</div>
        )
    }

}

export default ModalContainer;
