import { ICovidData } from "./covid-data.interface";

export interface IStateCovidData extends ICovidData {
  state: string;
}
