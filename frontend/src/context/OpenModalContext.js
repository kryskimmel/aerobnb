import { useState, createContext} from "react";

export const OpenModalMenuContext = createContext();

export const OpenModalMenuProvider = props => {
    const [onModalComponent, setOnModalComponent] = useState(null);
    const [onModalClose, setOnModalClose] = useState(null)

    return (
        <OpenModalMenuContext.Provider value={{onModalComponent, setOnModalComponent, onModalClose, setOnModalClose}}>
            {props.children}
        </OpenModalMenuContext.Provider>
    )
}
