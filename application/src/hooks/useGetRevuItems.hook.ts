import { useCallback } from "react";
import { Return, Revu } from "../../utils/types";
import { useFocusEffect } from "@react-navigation/native";
import { getRevuItemsUnsubscribe, useLazyGetRevuItemsQuery } from "../redux/revu.api.slice";

const useGetRevuItems = (revu?: Return<Revu>) => {
  const [getRevuItems, { data: revuItems, isFetching, isError }] = useLazyGetRevuItemsQuery();

  useFocusEffect(useCallback(() => {
    if (!revu) return;

    getRevuItems(revu.revuId);
    return getRevuItemsUnsubscribe?.();
  }, [revu?.revuId]));

  return { revuItems, isFetching, isError };
}

export { useGetRevuItems };
