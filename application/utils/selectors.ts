export const getRevuIdSelector = (state: any): number => (state.routes[state.index].params as any)?.revuId ?? -1;
