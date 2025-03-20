import { createContext, useContext } from "react";

const NavigationButtonContext = createContext(null);

export const useNavigationButtonContext = () => {
    return useContext(NavigationButtonContext);
}

export default NavigationButtonContext;