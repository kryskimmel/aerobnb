import { useState, createContext, useContext} from "react";


export const OpenModalMenuContext = createContext();

export const OpenModalMenuProvider = props => {
    const [onModalContent, setOnModalContent] = useState();
    const [onModalClose, setOnModalClose] = useState()

    return (
        <OpenModalMenuContext.Provider value={{onModalContent, setOnModalContent, onModalClose, setOnModalClose}}>
            {props.children}
        </OpenModalMenuContext.Provider>
    )
}

const useModal =  () => { return useContext(OpenModalMenuContext)}

export default useModal;
