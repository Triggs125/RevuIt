import { View } from "react-native"
import { Revu, RevuItem } from "../../../utils/types";
import { IconButton, List } from "react-native-paper";
import { EditableText } from "../../components/editable-text";
import { RatingSlider } from "../../components/rating-slider";
import { RatingButton } from "./revu-it-button";
import { useTheme } from "../../../utils/theme";
import { useTranslation } from "react-i18next";
import { useGetRevuItemRating } from "../../hooks/useGetRevuItemRating.hook";
import { Comments } from "./comments";

type RevuItemProps = {
  revu: Revu;
  revuItem: RevuItem;
};

const RevuItemCard = ({ revu, revuItem }: RevuItemProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { revuItemRating } = useGetRevuItemRating(revuItem.revuItemId);

  return (
    <View
      style={{
        flexDirection: 'column',
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: revu.color,
        borderRadius: theme.roundness,
        gap: theme.spacing(2)
      }}
    >
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        {revuItem.imageUrl ? <List.Image source={{ uri: revuItem.imageUrl }} /> : null}
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
              alignItems: 'flex-start'
            }}
          >
            <EditableText
              defaultValue={revuItem.name}
              placeholder={t('revu-item-name')}
              size="large"
              multiline
              style={{
                marginTop: theme.spacing(0.5)
              }}
            />
            <EditableText
              defaultValue={revuItem.description}
              placeholder={t('revu-item-desription')}
              multiline
              style={{
                marginTop: 0,
                paddingRight: theme.spacing(1.5),
                color: theme.colors.gray.dark
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
          gap: theme.spacing(2),
          alignItems: 'center'
        }}
      >
        <RatingSlider revu={revu} revuItem={revuItem} />
        <RatingButton revu={revu} revuItem={revuItem} revuItemRating={revuItemRating} />
      </View>
      <View
        style={{
          paddingBottom: theme.spacing(1)
        }}
      >
        {revuItemRating ? (
          <Comments revuItem={revuItem} />
        ) : null}
      </View>
    </View>
  )
}

export { RevuItemCard };
