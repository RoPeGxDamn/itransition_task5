import { createContext, useContext, useRef, useState } from "react";

export const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [controlForm, setControlForm] = useState({
    region: "ru",
    errors: 0,
    seed: 1,
  });
  const tableRef = useRef(null);

  const contextValue = {
    controlForm,
    setControlForm,
    tableRef
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
}

export const useFilter = () => {
  return useContext(FilterContext);
};
