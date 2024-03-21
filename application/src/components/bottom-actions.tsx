import { useTranslation } from "react-i18next";
import { AnimatedFAB, IconButton, Surface } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../utils/theme";
import { useKeyboardOffset } from "../hooks/useKeyboardOffset.hook";
import { useCallback, useMemo } from "react";
import { LayoutChangeEvent } from "react-native";

type BottomActionsProps = {
  isExtended?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  addButton: { text?: string; onPress: () => void; };
  actionButtons?: { icon: string; onPress: () => void; }[];
}

const ICON_SIZE = 28;

const BottomActions = ({ isExtended = true, onLayout, addButton, actionButtons }: BottomActionsProps) => {
  const { t } = useTranslation();
  const { bottom } = useSafeAreaInsets();
  const { theme } = useTheme();
  const keyboardOffset = useKeyboardOffset();

  const bottomOffset = useMemo(() => {
    if (keyboardOffset <= 0) {
      return bottom;
    }
    return keyboardOffset;
  }, [keyboardOffset, bottom]);

  return (
    <>
      {actionButtons && (
        <Surface
          elevation={3}
          onLayout={onLayout}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            gap: theme.spacing(0.5),
            width: '100%',
            paddingBottom: bottomOffset,
            backgroundColor: theme.colors.white,
            paddingLeft: theme.spacing()
          }}
        >
          {actionButtons.map(action => (
            <IconButton
              icon={action.icon}
              onPress={action.onPress}
              size={ICON_SIZE}
            />
          ))}
          {/* <IconButton
          icon="map-marker"
          size={ICON_SIZE}
          onPress={handleMapPress}
        />
        <IconButton
          icon="movie-open"
          size={ICON_SIZE}
          onPress={handleMoviePress}
        />
        <IconButton
          icon="barcode-scan"
          size={ICON_SIZE}
          onPress={handleBarcodePress}
        /> */}
        </Surface>
      )}
      <AnimatedFAB
        icon="plus"
        label={addButton.text}
        extended={isExtended || keyboardOffset > 0}
        onPress={addButton.onPress}
        theme={{ roundness: 20 }}
        style={{
          backgroundColor: theme.colors.primary,
          bottom: bottomOffset + theme.spacing(3),
          right: theme.spacing(4)
        }}
      />
    </>
  );
}

export { BottomActions };
