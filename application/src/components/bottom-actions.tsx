import { FAB, FABGroupProps, IconButton, PaperProvider, Portal, Surface } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../utils/theme";
import { useKeyboardOffset } from "../hooks/useKeyboardOffset.hook";
import { useMemo, useState } from "react";
import { LayoutChangeEvent } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

type BottomActionsProps = {
  isExtended?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  // addButton: { text?: string; disabled?: boolean; onPress: () => void; };
  // actionButtons?: { icon: string; onPress: () => void; }[];
}

const ICON_SIZE = 28;

const BottomActions = ({ isExtended = true, onLayout }: BottomActionsProps) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const keyboardOffset = useKeyboardOffset();
  const { navigate } = useNavigation();

  const [state, setState] = useState({ open: false });
  const onStateChange: FABGroupProps['onStateChange'] = ({ open }) => setState({ open });
  const { open } = state;

  const bottomOffset = useMemo(() => {
    if (keyboardOffset <= 0) {
      return bottom;
    }
    return keyboardOffset;
  }, [keyboardOffset, bottom]);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        onStateChange={onStateChange}
        icon={open ? 'chevron-down' : 'plus'}
        color={theme.colors.text}
        backdropColor="transparent"
        style={{
          backgroundColor: 'transparent',
          marginBottom: bottomOffset
        }}
        fabStyle={{
          backgroundColor: theme.colors.primary
        }}
        actions={[
          {
            icon: 'format-list-group',
            color: theme.colors.primary,
            style: { backgroundColor: theme.colors.text },
            onPress: () => (navigate as any)('Create Group')
          },
          {
            icon: 'message-draw',
            color: theme.colors.primary,
            style: { backgroundColor: theme.colors.text },
            onPress: () => (navigate as any)('Create Revu')
          },
        ]}
      />
    </Portal>
  );
}

export { BottomActions };
