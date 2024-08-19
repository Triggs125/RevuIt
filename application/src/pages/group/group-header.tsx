import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BackButton } from "../../components/back-button";
import { useTheme } from "../../../utils/theme";
import { IconButton, Surface } from "react-native-paper";
import { View } from "react-native";
import { useShare } from "../../hooks/useShare.hook";
import { Group } from "../../../utils/types";

const ICON_SIZE = 32;

type GroupHeaderProps = {
  group: Group;
}
const GroupHeader = ({ group }: GroupHeaderProps) => {
  const { theme } = useTheme();
  const { top } = useSafeAreaInsets();
  const { handleShare } = useShare();

  return (
    <Surface
      elevation={5}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: top,
        backgroundColor: group?.color ?? theme.colors.background
      }}
    >
      <BackButton />
      <View
        style={{
          flexDirection: 'row'
        }}
      >
        <IconButton
          icon='account-multiple'
          iconColor={theme.colors.light}
          size={ICON_SIZE}
          onPress={() => handleShare(group.groupId)}
        />
        <IconButton
          icon='share'
          iconColor={theme.colors.light}
          size={ICON_SIZE}
          onPress={() => handleShare(group.groupId)}
        />
        <IconButton
          icon='dots-horizontal-circle-outline'
          iconColor={theme.colors.light}
          size={ICON_SIZE}
          onPress={() => handleShare(group.groupId)}
        />
      </View>
    </Surface>
  );
}

export { GroupHeader };
