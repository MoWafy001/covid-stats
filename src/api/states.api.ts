import { API_BASE_URL } from "../consts";
import { IAPI } from "./interfaces/api.interface";
import daysjs from "dayjs";
import { IStateMetadata } from "./interfaces/state-metadata.interface";
import { IStateCovidData } from "./interfaces/state-covid-data.interface";

export class StatesAPI implements IAPI {
  baseUrl = `${API_BASE_URL}/states`;

  public async metadataForAll(): Promise<IStateMetadata[]> {
    const endpointPath = "/info.json";

    const response = await fetch(`${this.baseUrl}${endpointPath}`);
    const data = await response.json();
    return data;
  }

  public async metadataForState(state: string): Promise<IStateMetadata> {
    const endpointPath = `/${state}/info.json`;

    const response = await fetch(`${this.baseUrl}${endpointPath}`);
    const data = await response.json();
    return data;
  }

  public async historicDataForAll(): Promise<IStateCovidData[]> {
    const endpointPath = "/daily.json";

    const response = await fetch(`${this.baseUrl}${endpointPath}`);
    const data = await response.json();
    return data;
  }

  public async historicDataForState(state: string): Promise<IStateCovidData> {
    const endpointPath = `/${state}/daily.json`;

    const response = await fetch(`${this.baseUrl}${endpointPath}`);
    const data = await response.json();
    return data;
  }

  public async currentDataForAll(): Promise<IStateCovidData[]> {
    const endpointPath = "/current.json";

    const response = await fetch(`${this.baseUrl}${endpointPath}`);
    const data = await response.json();
    return data;
  }

  public async currentDataForState(state: string): Promise<IStateCovidData> {
    const endpointPath = `/${state}/current.json`;

    const response = await fetch(`${this.baseUrl}${endpointPath}`);
    const data = await response.json();
    return data;
  }

  public async valuesForState(
    state: string,
    date: Date
  ): Promise<IStateCovidData> {
    const dateString = daysjs(date).format("YYYYMMDD");
    const endpointPath = `/${state}/${dateString}.json`;

    const response = await fetch(`${this.baseUrl}${endpointPath}`);
    const data = await response.json();
    return data;
  }
}
