import { useState, createContext, useContext} from "react";


export const CurrSpotIdContext = createContext();

export const CurrSpotIdProvider = props => {
    const [spotId, setSpotId] = useState();


    return (
        <CurrSpotIdContext.Provider value={{spotId, setSpotId}}>
            {props.children}
        </CurrSpotIdContext.Provider>
    )
}

const useCurrSpotId =  () => { return useContext(CurrSpotIdContext)}

export default useCurrSpotId;
