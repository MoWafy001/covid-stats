import styled from "styled-components";
import { colors } from "../consts";
import { useSearch, useSearchUpdate } from "../hooks/use-search";
import { useLocation, useNavigate } from "react-router-dom";

const SearchInput = styled.input`
  background: ${colors.quaternaryColor};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  width: max(20%, 7rem);
  outline: none;
  border: 1px solid ${colors.quaternaryColor};
`;

export const SearchBar: React.FC = () => {
  const searchTerm = useSearch();
  const searchUpdate = useSearchUpdate();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <SearchInput
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={(e) => {
        searchUpdate(e.target.value);

        // if not in the states page, move to it
        if (!(location.pathname === "/states")) navigate("/states");
      }}
    />
  );
};
