import { Button, ButtonProps, Icon, Menu, Text, TextProps } from "react-native-paper"
import { RatingFeelings, Revu, RevuItem, RevuItemRating } from "../../../utils/types";
import { Style } from "react-native-paper/lib/typescript/components/List/utils";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../utils/theme";
import { View } from "react-native";
import { useMemo, useRef, useState } from "react";
import { RevuItRatingMenu } from "./revu-it-rating-menu";

type RatingButtonProps = {
  revu: Revu;
  revuItem: RevuItem;
  revuItemRating?: RevuItemRating;
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

const RatingButton = ({ revu, revuItem, revuItemRating, style }: RatingButtonProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const buttonRef = useRef<View>(null);
  const [visible, setVisisble] = useState(false);

  const contents = useMemo(() => {
    switch (revuItemRating?.feeling) {
      case 'DISLIKE': {
        return (
          <>
            <Icon source="thumb-down" size={ICON_SIZE} />
            <Text {...TEXT_PROPS}>{t('dislike')}</Text>
          </>
        );
      }
      case 'MEH': {
        return (
          <>
            <Icon source="thumbs-up-down" size={ICON_SIZE} />
            <Text {...TEXT_PROPS}>{t('meh')}</Text>
          </>
        );
      }
      case 'LIKE': {
        return (
          <>
            <Icon source="thumb-up" size={ICON_SIZE} />
            <Text {...TEXT_PROPS}>{t('like')}</Text>
          </>
        );
      }
      case 'LOVE': {
        return (
          <>
            <Icon source="heart" size={ICON_SIZE} />
            <Text {...TEXT_PROPS}>{t('love')}</Text>
          </>
        );
      }
      default: {
        return (
          <>
            <Icon source="thumb-up" size={ICON_SIZE} />
            <Text {...TEXT_PROPS}>{t('app-name')}</Text>
          </>
        );
      }
    }
  }, [revuItemRating?.feeling]);

  return (
    <RevuItRatingMenu
      visible={visible}
      revuItemRating={revuItemRating}
      onDismiss={() => setVisisble(false)}
      anchor={(
        <Button
          ref={buttonRef}
          mode={!revuItemRating?.feeling ? "outlined" : "contained"}
          onPress={() => setVisisble(v => !v)}
          style={{
            backgroundColor: !revuItemRating?.feeling ? 'transparent' : theme.colors.rated,
            borderRadius: theme.roundness,
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
