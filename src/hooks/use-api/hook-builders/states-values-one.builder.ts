import { api } from "../../../api/api";
import { IStateCovidData } from "../../../api/interfaces/state-covid-data.interface";
import {
  IApiHookBuilder,
  StateArray,
} from "../contracts/endpoint-hook.interface";

export class StatesValuesOneBuilder
  implements IApiHookBuilder<IStateCovidData>
{
  build(dataState: StateArray<IStateCovidData>, errorState: StateArray<any>) {
    const [data, setData] = dataState;
    const [error, setError] = errorState;

    const fetchData = async (state: string, date: Date) => {
      try {
        const data = await api.states
          .valuesForState(state, date)
          .catch((error) => {
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
