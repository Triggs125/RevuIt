import { useFocusEffect } from "@react-navigation/native";
import { getGroupsUnsubscribe, useGetGroupsQuery } from "../redux/dashboard.api.slice";
import { useCallback, useState } from "react";
import { debounce } from "lodash";

const useGetDashboardItems = () => {
  const [searchText, setSearchText] = useState('');
  const debounceSearchText = debounce(setSearchText, 800);
  const handleChangeText = useCallback((text: string) => {
    debounceSearchText(text);
  }, [debounceSearchText]);

  const { data: groups, isFetching: groupsAreFetching, isError: groupsHasError } = useGetGroupsQuery(searchText);

  useFocusEffect(useCallback(() => {
    return getGroupsUnsubscribe?.();
  }, []));

  return { groups, isFetching: groupsAreFetching, hasError: groupsHasError, setSearchText: handleChangeText };
}

export { useGetDashboardItems };