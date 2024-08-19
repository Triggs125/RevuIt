import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "../../components/back-button";
import { useTheme } from "../../../utils/theme";
import { IconButton, Surface, Text } from "react-native-paper";
import { useTranslation } from "react-i18next";

const AddRevuHeader = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();

  return (
    <Surface
      elevation={5}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: top,
        backgroundColor: theme.colors.background
      }}
    >
      <BackButton />
      <Text variant="titleLarge">{t('revu-create')}</Text>
      <IconButton
        icon="arrow-left"
        size={32}
        iconColor="transparent"
      />
    </Surface>
  );
}

export { AddRevuHeader };
