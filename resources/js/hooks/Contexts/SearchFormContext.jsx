import { createContext, useContext } from "react";

const SearchFormContext = createContext(null);

export const useSearchForm = () => {
    return useContext(SearchFormContext);
};

export default SearchFormContext;

