import { useState, createContext} from "react";

export const LoginContext = createContext();

export const LoginProvider = props => {
    const [openLogin, setOpenLogin] = useState('false');

    return (
        <LoginContext.Provider value={{openLogin, setOpenLogin}}>
            {props.children}
        </LoginContext.Provider>
    )
}
