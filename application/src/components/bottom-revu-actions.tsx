import { FAB, Portal } from "react-native-paper";
import { useTheme } from "../../utils/theme";
import { useKeyboardOffset } from "../hooks/useKeyboardOffset.hook";
import { useCallback, useMemo } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type BottomRevuActionsProps = {
  groupId: string;
}

const BottomRevuActions = ({ groupId }: BottomRevuActionsProps) => {
  const { theme } = useTheme();
  const keyboardOffset = useKeyboardOffset();
  const { bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();

  const handleClick = useCallback(() => {
    (navigate as any)('Create Revu', { groupId });
  }, [navigate, groupId]);

  const bottomOffset = useMemo(() => {
    if (keyboardOffset <= 0) {
      return bottom + theme.spacing(2);
    }
    return keyboardOffset + theme.spacing(2);
  }, [keyboardOffset, bottom]);

  return (
    <Portal>
      <FAB
        visible
        icon="plus"
        color={theme.colors.text}
        onPress={handleClick}
        style={{
          backgroundColor: theme.colors.primary,
          bottom: bottomOffset,
          right: theme.spacing(2),
          position: 'absolute'
        }}
      />
    </Portal>
  );
}

export { BottomRevuActions };
