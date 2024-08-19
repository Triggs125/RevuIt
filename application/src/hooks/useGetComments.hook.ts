import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Revu } from "../../utils/types";
import { getCommentsUnsubscribe, useLazyGetCommentsQuery } from "../redux/revu.api.slice";

type Options = {
  skip?: boolean;
}

const useGetComments = (revu: Revu, options?: Options) => {
  const [getComments, { data: comments, isFetching, isError }] = useLazyGetCommentsQuery();

  useFocusEffect(useCallback(() => {
    if (!options?.skip) {
      getComments(revu?.revuId);
      return getCommentsUnsubscribe?.();
    }
  }, [revu.revuId, options]));

  return { comments, isFetching, isError };
}

export { useGetComments }
