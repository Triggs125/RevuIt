export const getGroupIdSelector = (state: any): string => {
  return (state.routes[state.index].params as any)?.groupId ?? '-1';
}
