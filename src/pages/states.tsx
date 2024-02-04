import useApi from "../hooks/use-api";
import { PageContainer } from "./page-container";
import { PageTitle } from "./page-title";
import { useEffect } from "react";
import { StateCard } from "./state-card";
import { IStateMetadata } from "../api/interfaces/state-metadata.interface";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const States: React.FC = () => {
  const { data, fetchData, loading } = useApi("states.metaData.all");
  const payload = (data || []) as IStateMetadata[];
  console.log(payload);

  useEffect(() => {
    if (!data && !loading) {
      fetchData();
    }
  }, []);

  return (
    <PageContainer>
      <PageTitle>States</PageTitle>
      <CardsContainer>
        {payload.map((state) => (
          <StateCard name={state.name} state={state.state} />
        ))}
      </CardsContainer>
    </PageContainer>
  );
};
