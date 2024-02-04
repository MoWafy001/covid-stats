import { api } from "../../../api/api";
import { IStateMetadata } from "../../../api/interfaces/state-metadata.interface";
import {
  IApiHookBuilder,
  StateArray,
} from "../contracts/endpoint-hook.interface";

export class StatesMetadataOneBuilder
  implements IApiHookBuilder<IStateMetadata>
{
  build(dataState: StateArray<IStateMetadata>, errorState: StateArray<any>) {
    const [data, setData] = dataState;
    const [error, setError] = errorState;

    const fetchData = async (state: string) => {
      try {
        const data = await api.states.metadataForState(state).catch((error) => {
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
