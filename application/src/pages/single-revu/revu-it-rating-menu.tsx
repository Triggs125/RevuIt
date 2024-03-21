import { Button, Icon, Menu, MenuProps, Text } from "react-native-paper";
import { RevuItemRating } from "../../../utils/types";
import { useTheme } from "../../../utils/theme";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";
import { useMemo } from "react";

type RevuItRatingMenuProps = Omit<MenuProps, 'anchorPosition' | 'children' | 'theme'> & {
  revuItemRating?: RevuItemRating;
};

const RevuItRatingMenu = (props: RevuItRatingMenuProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const styles = useMemo<Record<string, ViewProps['style']>>(() => ({
    buttonContent: {
      borderRadius: theme.roundness,
      paddingTop: theme.spacing(0.5)
    },
    buttonView: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: theme.spacing(0.5)
    }
  }), []);

  return (
    <Menu
      {...props}
      anchorPosition="bottom"
      contentStyle={[
        {
          flexDirection: 'row',
          backgroundColor: theme.colors.background,
          gap: theme.spacing(0.5),
          paddingHorizontal: theme.spacing()
        },
        props.contentStyle
      ]}
    >
      <Button
        style={[
          styles.buttonContent,
          {
            backgroundColor: !props.revuItemRating?.feeling ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="close" size={28} />
          <Text>{t('none')}</Text>
        </View>
      </Button>
      <Button
        style={[
          styles.buttonContent,
          {
            backgroundColor: props.revuItemRating?.feeling === 'DISLIKE' ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="thumb-down" size={28} />
          <Text>{t('dislike')}</Text>
        </View>
      </Button>
      <Button
        style={[
          styles.buttonContent,
          {
            backgroundColor: props.revuItemRating?.feeling === 'MEH' ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="thumbs-up-down" size={28} />
          <Text>{t('meh')}</Text>
        </View>
      </Button>
      <Button
        style={[
          styles.buttonContent,
          {
            backgroundColor: props.revuItemRating?.feeling === 'LIKE' ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="thumb-up" size={28} />
          <Text>{t('like')}</Text>
        </View>
      </Button>
      <Button
        style={[
          styles.buttonContent,
          {
            backgroundColor: props.revuItemRating?.feeling === 'LOVE' ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="heart" size={28} />
          <Text>{t('love')}</Text>
        </View>
      </Button>
    </Menu>
  )
}

export { RevuItRatingMenu };
