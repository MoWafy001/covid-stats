import styled from "styled-components";
import { colors } from "../consts";

const StatContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${({ color }) => color || colors.primaryColor};
  gap: 1rem;
  padding: 1rem;
  justify-content: space-between;
`;

const StatLabel = styled.span`
  display: block;
  font-size: 1rem;
  color: ${({ color }) => color || colors.primaryColor};
`;

const StatValue = styled(StatLabel)``;

const StatIncrease = styled(StatLabel)``;

export const NumberStat = (props: {
  label: string;
  value: number;
  increase?: number;
  color?: string;
}) => {
  return (
    <StatContainer color={props.color}>
      <StatLabel color={props.color}>{props.label}</StatLabel>
      <StatValue color={props.color}>amount: {props.value || "N/A"}</StatValue>
      <StatIncrease color={props.color}>
        increase: {props.increase || "N/A"}
      </StatIncrease>
    </StatContainer>
  );
};
