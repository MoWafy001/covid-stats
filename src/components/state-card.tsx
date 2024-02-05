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
`;

const CardTitle = styled.span`
  display: block;
  text-transform: capitalize;
  font-weight: bold;
  color: ${({ color }) => color || colors.primaryColor};
  font-size: 0%.4rem;
`;

const ShowButton = styled(Link)`
  background: ${colors.primaryColor};
  padding: 0.4rem;
  border-radius: 10px;
  color: ${colors.quaternaryColor};
  text-align: center;
  margin: 0;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.3s ease;
  font-size: 0.8rem;
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
