import { API_BASE_URL } from "../consts";
import { IAPI } from "./interfaces/api.interface";
import daysjs from "dayjs";
import { IStateMetadata } from "./interfaces/state-metadata.interface";
import { IStateCovidData } from "./interfaces/state-covid-data.interface";
import memoization from "../lib/memoization-center/memoization";

export class StatesAPI implements IAPI {
  baseUrl = `${API_BASE_URL}/states`;

  public async metadataForAll(): Promise<IStateMetadata[]> {
    const endpointPath = "/info.json";
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    });
  }

  public async metadataForState(state: string): Promise<IStateMetadata> {
    const endpointPath = `/${state}/info.json`;
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data[0];
    });
  }

  public async historicDataForAll(): Promise<IStateCovidData[]> {
    const endpointPath = "/daily.json";
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    });
  }

  public async historicDataForState(state: string): Promise<IStateCovidData> {
    const endpointPath = `/${state}/daily.json`;
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data[0];
    });
  }

  public async currentDataForAll(): Promise<IStateCovidData[]> {
    const endpointPath = "/current.json";
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    });
  }

  public async currentDataForState(state: string): Promise<IStateCovidData> {
    const endpointPath = `/${state}/current.json`;
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data[0];
    });
  }

  public async valuesForState(
    state: string,
    date: Date
  ): Promise<IStateCovidData> {
    const dateString = daysjs(date).format("YYYYMMDD");
    const endpointPath = `/${state}/${dateString}.json`;
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data[0];
    });
  }
}
