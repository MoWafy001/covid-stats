import useApi from "../hooks/use-api/use-api";
import { PageContainer } from "../components/page-container";
import { PageTitle } from "../components/page-title";
import { useEffect } from "react";
import { StateCard } from "../components/state-card";
import { IStateMetadata } from "../api/interfaces/state-metadata.interface";
import styled from "styled-components";
import { useSearch } from "../hooks/use-search";
import { Loading } from "../components/loading";

const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const States: React.FC = () => {
  const { data, fetchData } = useApi("states.metaData.all");
  const searchTerm = useSearch();

  let payload = (data || []) as IStateMetadata[];

  if (searchTerm)
    payload = payload.filter((state) =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    if (!data) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return <Loading />;
  }

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
