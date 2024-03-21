import { useCallback, useMemo, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { IconButton, Menu, Modal, Portal, Text } from "react-native-paper"
import { useTheme } from "../../utils/theme";
import { useTranslation } from "react-i18next";
import { useGetScreenDimensions } from "../hooks/useGetScreenDimensions.hook";

type ColorChangerMenuProps = {
  showText?: boolean;
  size?: number;
}

const ColorChangerModal = ({ showText, size = 32 }: ColorChangerMenuProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { width } = useGetScreenDimensions();

  const colorWidth = useMemo(() => {
    return {
      width: width / 4,
      maxWidth: 100,
      height: width / 4,
      maxHeight: 100
    }
  }, [width]);

  const [open, setOpen] = useState(false);

  const handleChangeColor = useCallback((color: string) => {
    console.log('Change color:', color);
    setOpen(false);
  }, [])

  const anchor = useMemo(() => showText ? (
    <Menu.Item
      leadingIcon={'palette'}
      title={t('change-color')}
      onPress={() => setOpen(true)}
    />
  ) : (
    <IconButton
      icon='palette'
      size={size}
      iconColor={theme.colors.light}
      onPress={() => setOpen(true)}
    />
  ), [showText, size])

  return (
    <View>
      {anchor}
      <Portal>
        <Modal
          visible={open}
          onDismiss={() => setOpen(false)}
          contentContainerStyle={{
            gap: theme.spacing(),
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingHorizontal: theme.spacing(2),
            backgroundColor: theme.colors.white,
            padding: theme.spacing(4),
            margin: theme.spacing(2),
            borderRadius: theme.roundness
          }}
        >
          {Object.values(theme.colors.choices).map(color => (
            <TouchableOpacity
              onPress={() => handleChangeColor(color)}
              style={{
                ...colorWidth,
                backgroundColor: color,
                borderRadius: theme.roundness
              }}
            />
          ))}
        </Modal>
      </Portal>
    </View>
  )
}

export { ColorChangerModal };
