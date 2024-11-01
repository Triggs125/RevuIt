import { FAB, Portal } from "react-native-paper";
import { useTheme } from "../../utils/theme";
import { useKeyboardOffset } from "../hooks/useKeyboardOffset.hook";
import { useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomActions = ({ onPress }: { onPress: () => void }) => {
  const { theme } = useTheme();
  const keyboardOffset = useKeyboardOffset();
  const { bottom } = useSafeAreaInsets();

  const bottomOffset = useMemo(() => {
    if (keyboardOffset <= 0) {
      return bottom + theme.spacing(2);
    }
    return keyboardOffset + theme.spacing(2);
  }, [bottom, keyboardOffset]);

  return (
    <Portal>
      <FAB
        icon="plus"
        visible
        color={theme.colors.text}
        onPress={onPress}
        style={{
          position: 'absolute',
          backgroundColor: theme.colors.primary,
          bottom: bottomOffset,
          right: theme.spacing(2)
        }}
      />
    </Portal>
  );
}

export { BottomActions };
