import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetRevu } from "../../hooks/useGetRevu.hook";
import { BackButton } from "../../components/back-button";
import { useTheme } from "../../../utils/theme";
import { IconButton, Surface } from "react-native-paper";
import { View } from "react-native";
import { useShare } from "../../hooks/useShare.hook";
import { useCallback } from "react";
import { ColorChangerModal } from "../../components/color-changer-modal";

const ICON_SIZE = 32;

const RevuHeader = () => {
  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();
  const { revu } = useGetRevu();
  const { handleShare } = useShare();

  const handleColorChange = useCallback(() => {
    console.log('Color Change Pressed');
  }, []);

  return (
    <Surface
      elevation={5}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: top,
        backgroundColor: revu?.color ?? theme.colors.background
      }}
    >
      <BackButton />
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        {/* <ColorChangerModal /> */}
        <IconButton
          icon='account-multiple'
          iconColor={theme.colors.light}
          size={ICON_SIZE}
          onPress={() => handleShare(revu?.revuId)}
        />
        <IconButton
          icon='share'
          iconColor={theme.colors.light}
          size={ICON_SIZE}
          onPress={() => handleShare(revu?.revuId)}
        />
        <IconButton
          icon='dots-horizontal-circle-outline'
          iconColor={theme.colors.light}
          size={ICON_SIZE}
          onPress={() => handleShare(revu?.revuId)}
        />
      </View>
    </Surface>
  );
}

export { RevuHeader };
