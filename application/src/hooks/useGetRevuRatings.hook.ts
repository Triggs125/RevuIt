import { useCallback, useMemo } from "react";
import { getRevuRatingsUnsubscribe, useGetRevuRatingsQuery } from "../redux/revu.api.slice";
import { getUserDoc } from "../../utils/firestore-helpers";
import { useFocusEffect } from "@react-navigation/native";

const useGetRevuRatings = (revuId: string) => {
  const { data: revuRatings, isFetching, isError } = useGetRevuRatingsQuery(revuId, { skip: !revuId });

  useFocusEffect(useCallback(() => {
    return getRevuRatingsUnsubscribe?.();
  }, []));

  const userRevuRating = useMemo(() => {
    // TODO: Remove string to get the current logged in user
    return revuRatings?.find(rating => {
      return rating.createdBy === getUserDoc().path;
    })
  }, [revuRatings])

  return { revuRatings, userRevuRating, isFetching, isError };
}

export { useGetRevuRatings };
