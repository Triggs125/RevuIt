import { MutableRefObject, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

type DimensionsType = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  pageX?: number;
  pageY?: number;
}

const useGetDimensions = (ref: MutableRefObject<View>) => {
  const [dimensions, setDimensions] = useState<DimensionsType>({
    x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0
  });
  useEffect(() => {
    ref?.current?.measure?.((x, y, width, height, pageX, pageY) => {
      setDimensions({ x, y, width, height, pageX, pageY });
    });
  }, [ref?.current]);

  return dimensions;
}

export { useGetDimensions };
