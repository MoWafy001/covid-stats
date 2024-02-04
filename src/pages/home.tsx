import { colors } from "../consts";
import useApi from "../hooks/use-api/use-api";
import { useEffect } from "react";
import { NumberStat } from "../components/number-stat";
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
import { StatsNumbersContainer } from "../components/stats-number-container";
import { Loading } from "../components/loading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Home: React.FC = () => {
  const { data: dataCurrent, fetchData: fetchDataCurrent } =
    useApi("us.current");
  const { data: dataHistorical, fetchData: fetchDataHistorical } =
    useApi("us.historical.all");

  useEffect(() => {
    if (!dataCurrent) {
      fetchDataCurrent();
    }

    if (!dataHistorical) {
      fetchDataHistorical();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!dataCurrent || !dataHistorical) {
    return <Loading />;
  }

  return (
    <PageContainer>
      <PageTitle>Current US Cases ({dataCurrent.dateChecked})</PageTitle>
      <StatsNumbersContainer>
        <NumberStat
          value={dataCurrent.death}
          label="death"
          increase={dataCurrent.deathIncrease}
        />
        <NumberStat
          value={dataCurrent.positive}
          label="positive"
          increase={dataCurrent.positiveIncrease}
        />
        <NumberStat
          value={dataCurrent.negative}
          label="negative"
          increase={dataCurrent.negativeIncrease}
        />
        <NumberStat
          value={dataCurrent.hospitalized}
          label="hospitalized"
          increase={dataCurrent.hospitalizedIncrease}
        />
        <NumberStat value={dataCurrent.pending} label="pending" />
        <NumberStat
          value={dataCurrent.inIcuCurrently}
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
          labels: dataHistorical.map((data) => data.dateChecked),
          datasets: [
            {
              label: "Positive",
              data: dataHistorical.map((data) => data.positive),
              fill: false,
              backgroundColor: colors.primaryColor,
              borderColor: colors.primaryColor,
            },
            {
              label: "Negative",
              data: dataHistorical.map((data) => data.negative),
              fill: false,
              backgroundColor: colors.secondaryColor,
              borderColor: colors.secondaryColor,
            },
            {
              label: "Death",
              data: dataHistorical.map((data) => data.death),
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
