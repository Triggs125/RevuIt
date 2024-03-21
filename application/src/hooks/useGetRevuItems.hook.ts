import { useMemo } from "react";
import { mockRevuItems } from "../../mocks/mockRevuItems";
import { Revu } from "../../utils/types";

const useGetRevuItems = (revu: Revu) => {
  const revuItems = useMemo(() => mockRevuItems, [mockRevuItems]);

  return { revuItems };
}

export { useGetRevuItems };
