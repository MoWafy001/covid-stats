import styled from "styled-components";
import { colors } from "../consts";
import { Link } from "react-router-dom";

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ color }) => color || colors.primaryColor};
  gap: 1rem;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  font-size: 0%.8rem;
`;

const CardTitle = styled.span`
  display: block;
  text-transform: capitalize;
  font-weight: bold;
  font-size: 1.5rem;
  color: ${({ color }) => color || colors.primaryColor};
`;

const ShowButton = styled(Link)`
  background: ${colors.primaryColor};
  padding: 0.8rem;
  border-radius: 1rem;
  color: ${colors.quaternaryColor};
  font-weight: bold;
  text-align: center;
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  &:hover {
    background: ${colors.secondaryColor};
  }
`;

export const StateCard = (props: {
  name: string;
  state: string;
}) => {
  return (
    <CardContainer>
      <CardTitle>{props.name}</CardTitle>
      <ShowButton to={`/states/${props.state.toLowerCase()}`}>
        View Details
      </ShowButton>
    </CardContainer>
  );
};
