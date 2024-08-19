import { useFocusEffect } from "@react-navigation/native";
import { getGroupsUnsubscribe, getRevusUnsubscribe, useGetGroupsQuery, useGetRevusQuery } from "../redux/dashboard.api.slice";
import { useCallback } from "react";

const useGetDashboardItems = () => {
  const { data: groups, isFetching: groupsAreFetching, isError: groupsHasError } = useGetGroupsQuery('hello');
  const { data: revus, isFetching: revusAreFetching, isError: revusHasError } = useGetRevusQuery({ excludedGroupIds: groups?.map(group => group.groupId) }, { skip: groupsAreFetching });

  useFocusEffect(useCallback(() => {
    return getGroupsUnsubscribe?.();
  }, []));

  useFocusEffect(useCallback(() => {
    return getRevusUnsubscribe?.();
  }, []));

  return { groups, revus, isFetching: groupsAreFetching || revusAreFetching, hasError: groupsHasError || revusHasError };
}

export { useGetDashboardItems };