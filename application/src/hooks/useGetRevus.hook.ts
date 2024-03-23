import { useCallback, useMemo } from "react";
import { getRevusUnsubscribe, useGetRevusQuery } from '../redux/revus.api.slice';
import { useFocusEffect } from "@react-navigation/native";

const useGetRevus = () => {
  const { data: revus = [], isFetching, isError } = useGetRevusQuery('xPID1s7EBLSThSmWb09vSBiQUQ43');

  useFocusEffect(useCallback(() => {
    return getRevusUnsubscribe?.();
  }, []));

  const pinnedRevus = useMemo(() => revus?.filter(revu => revu.pinned === true), [revus]);
  const otherRevus = useMemo(() => revus?.filter(revu => !revu.pinned), [revus]);

  return { revus, pinnedRevus, otherRevus, isFetching, isError };
}

export { useGetRevus };
