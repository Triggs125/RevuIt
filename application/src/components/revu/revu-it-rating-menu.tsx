import { Button, Icon, Menu, MenuProps, Text } from "react-native-paper";
import { Rating, Revu } from "../../../utils/types";
import { useTheme } from "../../../utils/theme";
import { useTranslation } from "react-i18next";
import { View, ViewProps } from "react-native";
import { useCallback, useMemo } from "react";
import { useChangeFeelingMutation } from "../../redux/edit-revu.api.slice";

type RevuItRatingMenuProps = Omit<MenuProps, 'anchorPosition' | 'children' | 'theme'> & {
  rating?: Rating;
  revu: Revu;
};

const RevuItRatingMenu = (props: RevuItRatingMenuProps) => {
  const { rating, revu } = props;

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

  const [changeFeeling] = useChangeFeelingMutation();

  const handleChangeFeeling = useCallback((feeling: Rating['feeling']) => {
    changeFeeling({ rating, revu, feeling });
  }, [rating, revu, changeFeeling]);

  return (
    <Menu
      {...props}
      anchorPosition="bottom"
      contentStyle={[
        {
          flexDirection: 'row',
          backgroundColor: theme.colors.gray.light,
          gap: theme.spacing(0.5),
          paddingHorizontal: theme.spacing()
        },
        props.contentStyle
      ]}
    >
      <Button
        onPress={() => handleChangeFeeling(null)}
        style={[
          styles.buttonContent,
          {
            backgroundColor: !rating?.feeling ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="close" size={28} />
          <Text>{t('none')}</Text>
        </View>
      </Button>
      <Button
        onPress={() => handleChangeFeeling('DISLIKE')}
        style={[
          styles.buttonContent,
          {
            backgroundColor: rating?.feeling === 'DISLIKE' ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="thumb-down" size={28} />
          <Text>{t('dislike')}</Text>
        </View>
      </Button>
      <Button
        onPress={() => handleChangeFeeling('MEH')}
        style={[
          styles.buttonContent,
          {
            backgroundColor: rating?.feeling === 'MEH' ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="thumbs-up-down" size={28} />
          <Text>{t('meh')}</Text>
        </View>
      </Button>
      <Button
        onPress={() => handleChangeFeeling('LIKE')}
        style={[
          styles.buttonContent,
          {
            backgroundColor: rating?.feeling === 'LIKE' ? theme.colors.rated : undefined
          }
        ]}
      >
        <View style={styles.buttonView}>
          <Icon source="thumb-up" size={28} />
          <Text>{t('like')}</Text>
        </View>
      </Button>
      <Button
        onPress={() => handleChangeFeeling('LOVE')}
        style={[
          styles.buttonContent,
          {
            backgroundColor: rating?.feeling === 'LOVE' ? theme.colors.rated : undefined
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
