import styled from "styled-components";
import { colors } from "../consts";
import useApi from "../hooks/use-api";
import { useEffect } from "react";
import { NumberStat } from "../components/number-stat";
import { ICovidData } from "../api/interfaces/covid-data.interface";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PageTitle } from "../components/page-title";
import { PageContainer } from "../components/page-container";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StatsNumbersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const Home: React.FC = () => {
  const {
    data: dataCurrent,
    fetchData: fetchDataCurrent,
    loading: loadingCurrent,
  } = useApi("us.current");
  const {
    data: dataHistorical,
    fetchData: fetchDataHistorical,
    loading: loadingHistorical,
  } = useApi("us.historical");

  const currentPayload = (dataCurrent || {}) as ICovidData;
  const historicalPayload = (dataHistorical || []) as ICovidData[];

  useEffect(() => {
    if (!dataCurrent && !loadingCurrent) {
      fetchDataCurrent();
    }

    if (!dataHistorical && !loadingHistorical) {
      fetchDataHistorical();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <PageTitle>Current US Cases ({currentPayload.dateChecked})</PageTitle>
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
