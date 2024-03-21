import { useMemo } from "react";
import { revus } from "../../mocks/mockRevus";

const useGetRevus = () => {
  const pinnedRevus = useMemo(() => revus.filter(revu => revu.pinned === true), [revus]);
  const otherRevus = useMemo(() => revus.filter(revu => !revu.pinned), [revus]);

  return { revus, pinnedRevus, otherRevus };
}

export { useGetRevus };
