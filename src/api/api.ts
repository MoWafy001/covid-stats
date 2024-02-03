import { API_BASE_URL } from "../consts";
import { IAPI } from "./interfaces/api.interface";
import { StatesAPI } from "./states.api";
import { USAPI } from "./us.api";

class API implements IAPI {
  baseUrl = `${API_BASE_URL}`;

  public us = new USAPI();
  public states = new StatesAPI();
}

export const api = new API();
