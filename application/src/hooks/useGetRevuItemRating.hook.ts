import { useMemo } from "react";
import { mockRevuItemRatings } from "../../mocks/mockRevuItemRatings";
import { RevuItem, RevuItemRating } from "../../utils/types";

const useGetRevuItemRating = (revuItemId: RevuItem['revuItemId']) => {
  const revuItemRating = useMemo<RevuItemRating | undefined>(() => mockRevuItemRatings[0], [mockRevuItemRatings]);

  return { revuItemRating };
}

export { useGetRevuItemRating };
