import { useMemo } from "react";
import { scale } from 'chroma-js';
import { useTheme } from "../../utils/theme";
import { Avatar } from "react-native-paper";
import { Style } from "react-native-paper/lib/typescript/components/List/utils";

type RatingProps = {
  rating?: number;
  size?: 'small' | 'large';
  style?: Style;
}

const Rating = ({ rating, size = 'small', style }: RatingProps) => {
  const { theme } = useTheme();

  const colorScale = useMemo(() => {
    return scale([
      theme.colors.ratings.bad,
      theme.colors.ratings.mid,
      theme.colors.ratings.good
    ]);
  }, [theme.colors.ratings]);
  const color = useMemo(() => colorScale(rating / 10).hex(), [rating]);
  const avatarSize = useMemo(() => {
    switch (size) {
      case 'small':
        return 26;
      case 'large':
        return 36;
    }
  }, [size]);

  return rating ? (
    <Avatar.Text
      size={avatarSize}
      label={rating.toString()}
      color={theme.colors.text}
      style={[{ backgroundColor: color }, style]}
    />
  ) : null;
}

export { Rating };
