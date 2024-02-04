import { StatesCurrentAllBuilder } from "./hook-builders/states-current-all.builder";
import { StatesCurrentOneBuilder } from "./hook-builders/states-current-one.builder.";
import { StatesHistoricalAllBuilder } from "./hook-builders/states-historical-all.builder";
import { StatesHistoricalOneBuilder } from "./hook-builders/states-historical-one.builder";
import { StatesMetadataOneBuilder } from "./hook-builders/states-metadat-one.builder";
import { StatesMetadataAllBuilder } from "./hook-builders/states-metadata-all.builder";
import { StatesValuesOneBuilder } from "./hook-builders/states-values-one.builder";
import { USCurrentBuilder } from "./hook-builders/us-current.builder";
import { USHistoricalAllBuilder } from "./hook-builders/us-historical-all.builder";
import { USHistoricalOneBuilder } from "./hook-builders/us-historical-one.builder";
import { EndpointBuilders } from "./types/api-module.type";

export class UseApiManager {
  endpoints: EndpointBuilders = {
    "us.historical.one": USHistoricalOneBuilder,
    "us.historical.all": USHistoricalAllBuilder,
    "us.current": USCurrentBuilder,
    "states.metaData.all": StatesMetadataAllBuilder,
    "states.metaData.one": StatesMetadataOneBuilder,
    "states.historical.all": StatesHistoricalAllBuilder,
    "states.historical.one": StatesHistoricalOneBuilder,
    "states.current.all": StatesCurrentAllBuilder,
    "states.current.one": StatesCurrentOneBuilder,
    "states.values.one": StatesValuesOneBuilder,
  };

  build<T extends keyof EndpointBuilders>(
    endpointName: T
  ): InstanceType<EndpointBuilders[T]> {
    return new this.endpoints[endpointName]() as InstanceType<
      EndpointBuilders[T]
    >;
  }
}
