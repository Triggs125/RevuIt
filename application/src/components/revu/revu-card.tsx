import { useMemo } from "react";
import { View } from "react-native"
import { useTranslation } from "react-i18next";
import { Revu } from "../../../utils/types";
import { IconButton, List } from "react-native-paper";
import { EditableText } from "../editable-text";
import { RatingSlider } from "../rating-slider";
import { useTheme } from "../../../utils/theme";
import { useGetRevuRatings } from "../../hooks/useGetRevuRatings.hook";
import { getRatingFromFeeling } from "../../../utils/transforms";
import { RatingButton } from "./revu-it-button";
import { Comments } from "../comments/comments";

type RevuCardProps = {
  revu: Revu;
};

const RevuCard = ({ revu }: RevuCardProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { revuRatings, userRevuRating } = useGetRevuRatings(revu.revuId);

  const ratings = useMemo(() => {
    return revuRatings?.filter(rating => rating.feeling);
  }, [revuRatings]);

  const rating = useMemo(() => {
    if (!ratings?.length) return -1;

    const rating = ratings.reduce((curRating, rating) => {
      const feeling = getRatingFromFeeling(rating.feeling);
      if (!feeling) return curRating;
      return curRating + feeling;
    }, 0);

    return Math.round(rating / ratings.length * 10) / 10;
  }, [ratings]);

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: 'transparent',
        gap: theme.spacing(),
        paddingHorizontal: theme.spacing()
      }}
    >
      <View
        style={{
          flexDirection: 'row',
        }}
      >
        {revu.imageUrl ? <List.Image source={{ uri: revu.imageUrl }} /> : null}
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
            flexShrink: 1,
            paddingBottom: theme.spacing(),
            paddingLeft: theme.spacing(1.5),
            gap: theme.spacing()
          }}
        >
          <View
            style={{
              justifyContent: 'space-between',
              flexGrow: 1,
              flexShrink: 1,
              alignItems: 'flex-start',
            }}
          >
            <EditableText
              value={revu.name}
              placeholder={t('revu-item-name')}
              size="medium"
              multiline
              style={{
                marginTop: theme.spacing(0.5),
                alignSelf: 'stretch'
              }}
            />
            <EditableText
              value={revu.description}
              placeholder={t('revu-item-desription')}
              size="medium"
              multiline
              style={{
                marginTop: 0,
                paddingRight: theme.spacing(1.5),
                color: theme.colors.gray.main
              }}
            />
          </View>
          <IconButton
            onPress={() => { }}
            style={{
              margin: 0
            }}
            icon="dots-horizontal"
            iconColor={theme.colors.gray.main}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: theme.spacing(1.5),
          gap: theme.spacing(3),
          alignItems: 'center',
        }}
      >
        <RatingSlider rating={rating} numberOfRatings={ratings?.length ?? 0} />
        <RatingButton revu={revu} rating={userRevuRating} />
      </View>
      <View
        style={{
          paddingBottom: theme.spacing(1)
        }}
      >
        {userRevuRating && userRevuRating.feeling ? (
          <Comments revu={revu} />
        ) : null}
      </View>
    </View>
  )
}

export { RevuCard };
