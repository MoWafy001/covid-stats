import useApi from "../hooks/use-api/use-api";
import { useEffect } from "react";
import { StatsNumbersContainer } from "../components/stats-number-container";
import { NumberStat } from "../components/number-stat";
import { Line } from "react-chartjs-2";
import { colors } from "../consts";
import { Loading } from "../components/loading";
import { PageTitle } from "../components/page-title";

export const StateDetails = (props: { stateName: string }) => {
  const stateName = props.stateName;

  const { data: dataCurrent, fetchData: fetchDataCurrent } =
    useApi("states.current.one");

  const { data: dataHistorical, fetchData: fetchDataHistorical } = useApi(
    "states.historical.one"
  );

  const { data: dataMeta, fetchData: fetchDataMeta } = useApi(
    "states.metaData.one"
  );

  useEffect(() => {
    fetchDataCurrent(stateName);

    fetchDataHistorical(stateName);

    fetchDataMeta(stateName);
  }, [stateName]);
  

  if (!dataCurrent || !dataHistorical || !dataMeta) {
    return <Loading />;
  }

  return (
    <>
      <PageTitle>{dataMeta.name}</PageTitle>
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
          aspectRatio: document.body.clientWidth < 700 ? 1 : 2/1,
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
    </>
  );
};
