import { PageContainer } from "../components/page-container";
import { useParams } from "react-router-dom";
import { StateDetails } from "./state-details";

export const StateDetailsPage = () => {
  const params = useParams();
  const stateName = params.stateName as string;

  return (
    <PageContainer>
      <StateDetails stateName={stateName} />
    </PageContainer>
  );
};
