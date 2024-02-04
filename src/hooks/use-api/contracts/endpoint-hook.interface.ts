export type StateArray<T> = [data: T, setData: React.Dispatch<T>];

export interface IApiHookBuilder<T> {
  build(
    dataState: StateArray<T>,
    errorState: StateArray<any>
  ): {
    fetchData: (...props: any[]) => Promise<void>;
    data: T;
    error: any;
  };
}
