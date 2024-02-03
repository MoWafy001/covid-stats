import styled from "styled-components";
import { colors } from "../consts";

const SearchInput = styled.input`
  background: ${colors.quaternaryColor};
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  width: max(20%, 7rem);
  outline: none;
  border: 1px solid ${colors.quaternaryColor}
`;

export const SearchBar: React.FC = () => {
  return <SearchInput type="text" placeholder="Search..." />;
};
