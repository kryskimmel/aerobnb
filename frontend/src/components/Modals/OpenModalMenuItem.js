import React from 'react';
import useModal from '../../context/OpenModalContext';


function OpenModalMenuItem({
    modalComponent,
    itemText,
    onItemClick,
    onModalClose
  }) {
    const { setOnModalContent, setOnModalClose } = useModal();

    const onClick = () => {
      if (onModalClose) setOnModalClose(onModalClose);
      setOnModalContent(modalComponent);
      if (onItemClick) onItemClick();
    };

    return (
      <li onClick={onClick}>{itemText}</li>
    );
  }


export default OpenModalMenuItem;
