import useApi from "../hooks/use-api";
import { PageContainer } from "../components/page-container";
import { PageTitle } from "../components/page-title";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IStateCovidData } from "../api/interfaces/state-covid-data.interface";
import { StatsNumbersContainer } from "../components/stats-number-container";
import { NumberStat } from "../components/number-stat";
import { Line } from "react-chartjs-2";
import { colors } from "../consts";
import { IStateMetadata } from "../api/interfaces/state-metadata.interface";

export const StateDetails: React.FC = () => {
  const params = useParams();
  const stateName = params.stateName;

  const {
    data: dataCurrent,
    fetchData: fetchDataCurrent,
    loading: loadingCurrent,
  } = useApi("states.current.one");

  const {
    data: dataHistorical,
    fetchData: fetchDataHistorical,
    loading: loadingHistorical,
  } = useApi("states.historical.one");

  const {
    data: dataMeta,
    fetchData: fetchDataMeta,
    loading: loadingMeta,
  } = useApi("states.metaData.one");

  let currentPayload = (dataCurrent || {}) as IStateCovidData;
  let historicalPayload = (dataHistorical || []) as IStateCovidData[];
  let metaPayload = (dataMeta || {}) as IStateMetadata;

  useEffect(() => {
    if (!dataCurrent && !loadingCurrent) {
      fetchDataCurrent(stateName);
    }

    if (!dataHistorical && !loadingHistorical) {
      fetchDataHistorical(stateName);
    }

    if (!dataMeta && !loadingMeta) {
      fetchDataMeta(stateName);
    }
  }, []);

  return (
    <PageContainer>
      <PageTitle>{metaPayload.name}</PageTitle>

      <StatsNumbersContainer>
        <NumberStat
          value={currentPayload.death}
          label="death"
          increase={currentPayload.deathIncrease}
        />
        <NumberStat
          value={currentPayload.positive}
          label="positive"
          increase={currentPayload.positiveIncrease}
        />
        <NumberStat
          value={currentPayload.negative}
          label="negative"
          increase={currentPayload.negativeIncrease}
        />
        <NumberStat
          value={currentPayload.hospitalized}
          label="hospitalized"
          increase={currentPayload.hospitalizedIncrease}
        />
        <NumberStat value={currentPayload.pending} label="pending" />
        <NumberStat
          value={currentPayload.inIcuCurrently}
          label="in ICU currently"
        />
      </StatsNumbersContainer>

      <Line
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: "top" as const,
            },
            title: {
              display: true,
              text: "US Historical Data",
            },
          },
        }}
        data={{
          labels: historicalPayload.map((data) => data.dateChecked),
          datasets: [
            {
              label: "Positive",
              data: historicalPayload.map((data) => data.positive),
              fill: false,
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            },
            {
              label: "Negative",
              data: historicalPayload.map((data) => data.negative),
              fill: false,
              backgroundColor: colors.secondaryColor,
              borderColor: colors.secondaryColor,
            },
            {
              label: "Death",
              data: historicalPayload.map((data) => data.death),
              fill: false,
              backgroundColor: colors.tertiaryColor,
              borderColor: colors.tertiaryColor,
            },
          ],
        }}
      />
    </PageContainer>
  );
};
