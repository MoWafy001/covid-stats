import { StatesCurrentAllBuilder } from "../hook-builders/states-current-all.builder";
import { StatesCurrentOneBuilder } from "../hook-builders/states-current-one.builder.";
import { StatesHistoricalAllBuilder } from "../hook-builders/states-historical-all.builder";
import { StatesHistoricalOneBuilder } from "../hook-builders/states-historical-one.builder";
import { StatesMetadataOneBuilder } from "../hook-builders/states-metadat-one.builder";
import { StatesMetadataAllBuilder } from "../hook-builders/states-metadata-all.builder";
import { StatesValuesOneBuilder } from "../hook-builders/states-values-one.builder";
import { USCurrentBuilder } from "../hook-builders/us-current.builder";
import { USHistoricalAllBuilder } from "../hook-builders/us-historical-all.builder";
import { USHistoricalOneBuilder } from "../hook-builders/us-historical-one.builder";

export type EndpointBuilders = {
  "us.historical.one": typeof USHistoricalOneBuilder;
  "us.historical.all": typeof USHistoricalAllBuilder;
  "us.current": typeof USCurrentBuilder;
  "states.metaData.all": typeof StatesMetadataAllBuilder;
  "states.metaData.one": typeof StatesMetadataOneBuilder;
  "states.historical.all": typeof StatesHistoricalAllBuilder;
  "states.historical.one": typeof StatesHistoricalOneBuilder;
  "states.current.all": typeof StatesCurrentAllBuilder;
  "states.current.one": typeof StatesCurrentOneBuilder;
  "states.values.one": typeof StatesValuesOneBuilder;
};

export type ApiModule = keyof EndpointBuilders;
