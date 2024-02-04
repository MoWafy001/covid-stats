import { api } from "../../../api/api";
import { IStateCovidData } from "../../../api/interfaces/state-covid-data.interface";
import {
  IApiHookBuilder,
  StateArray,
} from "../contracts/endpoint-hook.interface";

export class StatesCurrentAllBuilder
  implements IApiHookBuilder<IStateCovidData[]>
{
  build(dataState: StateArray<IStateCovidData[]>, errorState: StateArray<any>) {
    const [data, setData] = dataState;
    const [error, setError] = errorState;

    const fetchData = async () => {
      try {
        const data = await api.states.currentDataForAll().catch((error) => {
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
