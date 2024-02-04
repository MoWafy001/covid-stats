import { createContext, useContext, useState } from "react";

const SearchContext = createContext("");
const SearchUpdateContext = createContext((searchTerm: string) => {});

export function useSearch() {
  return useContext(SearchContext);
}

export function useSearchUpdate() {
  return useContext(SearchUpdateContext);
}

export const SearchProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SearchContext.Provider value={searchTerm}>
      <SearchUpdateContext.Provider value={setSearchTerm as any}>
        {children}
      </SearchUpdateContext.Provider>
    </SearchContext.Provider>
  );
};
