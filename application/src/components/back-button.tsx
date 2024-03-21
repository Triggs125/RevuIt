import { useNavigation } from "@react-navigation/native"
import { IconButton } from "react-native-paper"
import { useTheme } from "../../utils/theme";

const BackButton = () => {
  const { theme } = useTheme();
  const { goBack } = useNavigation();

  return (
    <IconButton
      icon="arrow-left"
      onPress={goBack}
      size={32}
      iconColor={theme.colors.light}
    />
  );
}

export { BackButton };
