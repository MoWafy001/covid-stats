import { API_BASE_URL } from "../consts";
import memoization from "../lib/memoization-center/memoization";
import { IAPI } from "./interfaces/api.interface";
import { ICovidData } from "./interfaces/covid-data.interface";
import dayjs from "dayjs";

export class USAPI implements IAPI {
  baseUrl = `${API_BASE_URL}/us`;

  public async historicDataOne(date: Date): Promise<ICovidData> {
    const endpointPath = `/${dayjs(date).format("YYYYMMDD")}.json`;
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return date ? data[0] : data;
    });
  }

  public async historicDataAll(): Promise<ICovidData[]> {
    const endpointPath = "/daily.json";
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    });
  }

  public async currentData(): Promise<ICovidData> {
    const endpointPath = "/current.json";
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return data[0];
    });
  }
}
