import { useCallback } from "react";

const useShare = () => {
  const handleShare = useCallback((revuId?: string) => {
    console.log('Share Pressed:', revuId)
  }, []);

  return { handleShare };
}

export { useShare };
