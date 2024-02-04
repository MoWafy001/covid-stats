import { useState } from "react";
import { ApiModule, EndpointBuilders } from "./types/api-module.type";
import { UseApiManager } from "./use-api.manager";

export default function useApi<T extends ApiModule>(apiModule: T) {
  const useApiManager = new UseApiManager();
  const hookBuilder = useApiManager.build(apiModule) as InstanceType<
    EndpointBuilders[T]
  >;

  return hookBuilder.build(
    useState<any>(null),
    useState<any>(null)
  ) as ReturnType<InstanceType<EndpointBuilders[T]>["build"]>;
}
