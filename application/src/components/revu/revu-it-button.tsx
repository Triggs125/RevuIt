import { Button, Icon, Text, TextProps } from "react-native-paper"
import { Revu, Rating } from "../../../utils/types";
import { Style } from "react-native-paper/lib/typescript/components/List/utils";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../utils/theme";
import { View } from "react-native";
import { useMemo, useRef, useState } from "react";
import { RevuItRatingMenu } from "./revu-it-rating-menu";

type RatingButtonProps = {
  revu: Revu;
  rating?: Rating;
  style?: Style;
}

export type RevuItButtonProps = {
  buttonStyle?: Style;
  buttonContentStyle?: Style;
}

const ICON_SIZE = 24;
const TEXT_PROPS: Partial<TextProps<'headlineSmall'>> = {
  variant: 'titleLarge'
};

const RatingButton = ({ revu, rating, style }: RatingButtonProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const buttonRef = useRef<View>(null);
  const [visible, setVisible] = useState(false);

  const contents = useMemo(() => {
    switch (rating?.feeling) {
      case 'DISLIKE': {
        return (
          <>
            <Icon source="thumb-down" size={ICON_SIZE} />
            {/* <Text {...TEXT_PROPS}>{t('dislike')}</Text> */}
          </>
        );
      }
      case 'MEH': {
        return (
          <>
            <Icon source="thumbs-up-down" size={ICON_SIZE} />
            {/* <Text {...TEXT_PROPS}>{t('meh')}</Text> */}
          </>
        );
      }
      case 'LIKE': {
        return (
          <>
            <Icon source="thumb-up" size={ICON_SIZE} />
            {/* <Text {...TEXT_PROPS}>{t('like')}</Text> */}
          </>
        );
      }
      case 'LOVE': {
        return (
          <>
            <Icon source="heart" size={ICON_SIZE} />
            {/* <Text {...TEXT_PROPS}>{t('love')}</Text> */}
          </>
        );
      }
      default: {
        return (
          <>
            <Icon source="thumb-up" size={ICON_SIZE} />
            {/* <Text {...TEXT_PROPS}>{t('app-name')}</Text> */}
          </>
        );
      }
    }
  }, [rating?.feeling]);

  return (
    <RevuItRatingMenu
      visible={visible}
      rating={rating}
      revu={revu}
      onDismiss={() => setVisible(false)}
      anchor={(
        <Button
          ref={buttonRef}
          mode={!rating?.feeling ? "outlined" : "contained"}
          onPress={() => setVisible(v => !v)}
          labelStyle={{
            marginLeft: 0,
            marginRight: 0,
            marginTop: 4,
            marginBottom: 0
          }}
          style={{
            backgroundColor: !rating?.feeling ? 'transparent' : theme.colors.rated,
            borderWidth: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: theme.spacing(),
              padding: theme.spacing()
            }}
          >
            {contents}
          </View>
        </Button>
      )}
    />
  )
}

export { RatingButton };
