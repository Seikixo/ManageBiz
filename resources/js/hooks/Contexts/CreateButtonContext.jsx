import { createContext, useContext } from "react";

const CreateButtonContext = createContext(null);

export const useCreateButtonContext = () => {
    return useContext(CreateButtonContext);
}

export default CreateButtonContext;