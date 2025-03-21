import { createContext, useContext } from "react";

const DeleteButtonContext = createContext();

export const useDeleteButtonContext = () => {
    return useContext(DeleteButtonContext);
}

export default DeleteButtonContext;