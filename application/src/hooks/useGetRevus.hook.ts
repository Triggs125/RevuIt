import { useCallback, useMemo } from "react";
import { getRevusUnsubscribe, useGetRevusQuery } from '../redux/dashboard.api.slice';
import { useFocusEffect } from "@react-navigation/native";
import { Group, Revu } from "../../utils/types";

const useGetRevus = (group?: Group) => {
  const { data: revus = [], isFetching, isError } = useGetRevusQuery({ group }, { skip: !group });

  useFocusEffect(useCallback(() => {
    return getRevusUnsubscribe?.();
  }, []));

  // const { pinnedRevus, otherRevus } = useMemo(() => revus?.reduce<{ pinnedRevus: Revu[]; otherRevus: Revu[] }>((prev, cur) => {
  //   if (cur.pinned === true) {
  //     return { pinnedRevus: [...prev.pinnedRevus, cur], otherRevus: prev.otherRevus };
  //   }
  //   return { otherRevus: [...prev.otherRevus, cur], pinnedRevus: prev.pinnedRevus };
  // }, { pinnedRevus: [], otherRevus: [] }) ?? { pinnedRevus: [], otherRevus: [] }, [revus]);

  return { revus, isFetching, isError };
}

export { useGetRevus };
