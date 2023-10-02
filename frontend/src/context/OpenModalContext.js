import { useState, createContext, useContext} from "react";


export const OpenModalMenuContext = createContext();

export const OpenModalMenuProvider = props => {
    const [onModalContent, setOnModalContent] = useState();
    const [onModalClose, setOnModalClose] = useState()

    const closeModal = () => {
        setOnModalContent(null);
        if (onModalClose) {
          onModalClose();
          setOnModalClose(null);
        }
      };

    return (
        <OpenModalMenuContext.Provider value={{onModalContent, setOnModalContent, closeModal, setOnModalClose}}>
            {props.children}
        </OpenModalMenuContext.Provider>
    )
}

const useModal = () => { return useContext(OpenModalMenuContext)}

export default useModal;
