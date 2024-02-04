import { Link } from "react-router-dom";
import styled from "styled-components";
import { SearchBar } from "./search-bar";
import { colors } from "../consts";

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 6rem;
  background-color: ${colors.primaryColor};
  color: ${colors.quaternaryColor};
`;

const ItemsList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 1rem;
`;

const ListItem = styled(Link)`
  text-decoration: none;
  color: ${colors.quaternaryColor};
  transition: filter 300ms;
  &:hover{
    filter: brightness(1.5);
  }
`;

export const Navbar: React.FC = () => {
  return (
    <NavBar>
      <SearchBar />
      <ItemsList>
        <ListItem to={"/"}>Home</ListItem>
        <ListItem to={"/states"}>States</ListItem>
        <ListItem to={"/compare"}>Compare</ListItem>
      </ItemsList>
    </NavBar>
  );
};
