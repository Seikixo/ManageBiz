import { createContext, useContext } from "react";

const UpdateButtonContext = createContext();

export const useUpdateButtonContext  = () => {
    return useContext(UpdateButtonContext);
}

export default UpdateButtonContext;