import { useCallback, useMemo, useState } from "react";
import { scale } from 'chroma-js';
import { useTheme } from "../../utils/theme";
import { Avatar, Text } from "react-native-paper";
import { Style } from "react-native-paper/lib/typescript/components/List/utils";
import { LayoutChangeEvent, View } from "react-native";

type RatingSliderProps = {
  rating: number;
  numberOfRatings: number;
  style?: Style;
}

const RatingSlider = ({ rating, numberOfRatings, style }: RatingSliderProps) => {
  const { theme } = useTheme();

  const [width, setWidth] = useState(0);
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width - theme.spacing(3);
    setWidth(width);
  }, []);

  const ratingPosition = useMemo(() => {
    return width / 10 * rating;
  }, [width, rating]);

  const colorScale = useMemo(() => {
    return scale([
      theme.colors.ratings.bad,
      theme.colors.ratings.mid,
      theme.colors.ratings.good
    ]);
  }, [theme.colors.ratings]);
  const color = useMemo(() => colorScale(rating / 10).hex(), [rating]);

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          flexGrow: 1,
          flexShrink: 1,
          alignItems: 'center'
        },
        style
      ]}
    >
      {rating >= 0 && width > 0 ? (
        <Avatar.Text
          size={32}
          label={rating.toString()}
          color={theme.colors.text}
          style={{
            position: 'absolute',
            left: ratingPosition,
            backgroundColor: color,
            zIndex: 10
          }}
        />
      ) : null}
      <View
        onLayout={onLayout}
        style={{
          height: 2,
          backgroundColor: theme.colors.gray.main,
          borderRadius: 50,
          flexGrow: 1,
          flexShrink: 1
        }}
      />
      <Text
        style={{
          color: theme.colors.gray.main,
          paddingLeft: theme.spacing(2)
        }}
      >
        {numberOfRatings}
      </Text>
    </View>
  );
}

export { RatingSlider };
