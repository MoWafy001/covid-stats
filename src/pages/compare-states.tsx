import React, { useEffect, useState } from "react";
import useApi from "../hooks/use-api/use-api";
import styled from "styled-components";
import { PageContainer } from "../components/page-container";
import { PageTitle } from "../components/page-title";
import { colors } from "../consts";
import { StateDetails } from "./state-details";

const TwoHalves = styled.div`
    display: flex;
    gap: 2rem;
    width: 100%;
    margin-top: 2rem;
    margin-bottom: 2rem;
    justify-content: center;
    align-items: flex-start;
`;

const Half = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${colors.primaryColor};
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  color: ${colors.primaryColor};
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${colors.tertiaryColor};
    color: ${colors.tertiaryColor};
  }

  &:focus {
    outline: none;
    border-color: ${colors.secondaryColor};
    color: ${colors.secondaryColor};
  }
`;

export const CompareStates: React.FC = () => {
  const { data: stateMetaData, fetchData: fetchStatesMetaData } = useApi(
    "states.metaData.all"
  );
  const stateNames = stateMetaData?.map((state) => state.name) || [];

  const [stateName1, setState1] = useState({
    name: "",
    state: "",
  });
  const [stateName2, setState2] = useState({
    name: "",
    state: "",
  });

  useEffect(() => {
    if (!stateMetaData) {
      fetchStatesMetaData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleState1Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = stateMetaData?.find(
      (state) => state.name === event.target.value
    );

    if (state) setState1(state);
  };

  const handleState2Change = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const state = stateMetaData?.find(
      (state) => state.name === event.target.value
    );

    if (state) setState2(state);
  };

  return (
    <PageContainer>
      <PageTitle>Compare States</PageTitle>
      <TwoHalves>
        <Half>
          <Select onChange={handleState1Change}>
            <option value="">Select a state</option>
            {stateNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          {stateName1.name && <StateDetails stateName={stateName1.state} />}
        </Half>
        <Half>
          <Select onChange={handleState2Change}>
            <option value="">Select a state</option>
            {stateNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
          {stateName2.name && <StateDetails stateName={stateName2.state} />}
        </Half>
      </TwoHalves>
    </PageContainer>
  );
};
