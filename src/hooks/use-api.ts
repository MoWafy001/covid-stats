import { useState } from "react";
import { api } from "../api/api";

type ApiModules =
  | "us.historical"
  | "us.current"
  | "states.metaData.all"
  | "states.metaData.one"
  | "states.historical.all"
  | "states.historical.one"
  | "states.current.all"
  | "states.current.one"
  | "states.values.one";

export default function useApi(apiModule: ApiModules) {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any | null>(null);

  const fetchData = async (...props: any[]) => {
    try {
      setLoading(true);
      switch (apiModule) {
        case "us.historical":
          setData(await api.us.historicData(props[0]));
          break;
        case "us.current":
          setData(await api.us.currentData());
          break;
        case "states.metaData.all":
          setData(await api.states.metadataForAll());
          break;
        case "states.metaData.one":
          setData(await api.states.metadataForState(props[0]));
          break;
        case "states.historical.all":
          setData(await api.states.historicDataForAll());
          break;
        case "states.historical.one":
          setData(await api.states.historicDataForState(props[0]));
          break;
        case "states.current.all":
          setData(await api.states.currentDataForAll());
          break;
        case "states.current.one":
          setData(await api.states.currentDataForState(props[0]));
          break;
        case "states.values.one":
          setData(await api.states.valuesForState(props[0], props[1]));
          break;
        default:
          throw new Error("Invalid API module");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
}
