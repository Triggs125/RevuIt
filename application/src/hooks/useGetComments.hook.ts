import { mockComments } from "../../mocks/mockComments";
import { RevuItem } from "../../utils/types";

type Options = {
  skip?: boolean;
}

const useGetComments = (revuItem: RevuItem, options?: Options) => {
  const comments = mockComments;
  if (options?.skip) {
    return { comments: undefined };
  }
  return { comments };
}

export { useGetComments }
