import React from 'react';
import useModal from '../../context/OpenModalContext';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the menu item that opens the modal
  onButtonClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { onModalContent, setOnModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setOnModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  // console.log(onModalContent, ':modal content')

  return (
    <button onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;
