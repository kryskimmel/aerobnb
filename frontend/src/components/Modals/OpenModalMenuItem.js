import React, {useContext} from 'react';
import { OpenModalMenuContext } from '../../context/OpenModalContext';


function OpenModalMenuItem({
    modalComponent, // component to render inside the modal
    itemText, // text of the menu item that opens the modal
    onItemClick, // optional: callback function that will be called once the menu item that opens the modal is clicked
    onModalClose // optional: callback function that will be called once the modal is closed
  }) {
    const { setOnModalComponent, setOnModalClose } = useContext(OpenModalMenuContext);

    const onClick = () => {
      if (onModalClose) setOnModalClose(onModalClose);
      setOnModalComponent(modalComponent)
      if (onItemClick) onItemClick();
    };

    return (
      <li onClick={onClick}>{itemText}</li>
    );
  }


export default OpenModalMenuItem;
