import { api } from "../../../api/api";
import { ICovidData } from "../../../api/interfaces/covid-data.interface";
import {
  IApiHookBuilder,
  StateArray,
} from "../contracts/endpoint-hook.interface";

export class USHistoricalOneBuilder implements IApiHookBuilder<ICovidData> {
  build(dataState: StateArray<ICovidData>, errorState: StateArray<any>) {
    const [data, setData] = dataState;
    const [error, setError] = errorState;

    const fetchData = async (date: Date) => {
      try {
        const data = await api.us.historicDataOne(date).catch((error) => {
          throw error;
        });
        setData(data);
      } catch (error) {
        setError(error);
      }
    };

    return { fetchData, data, error };
  }
}
