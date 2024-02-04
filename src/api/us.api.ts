import { API_BASE_URL } from "../consts";
import memoization from "../lib/memoization-center/memoization";
import { IAPI } from "./interfaces/api.interface";
import { ICovidData } from "./interfaces/covid-data.interface";
import dayjs from "dayjs";

export class USAPI implements IAPI {
  baseUrl = `${API_BASE_URL}/us`;

  async historicData(date: Date): Promise<ICovidData>;

  async historicData(): Promise<ICovidData[]>;

  public async historicData(date?: Date): Promise<ICovidData | ICovidData[]> {
    const endpointPath = date
      ? `/${dayjs(date).format("YYYYMMDD")}.json`
      : "/daily.json";
    const url = `${this.baseUrl}${endpointPath}`;

    return memoization.memoize(`api-${url}`, async () => {
      const response = await fetch(url);
      const data = await response.json();
      return date ? data[0] : data;
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
