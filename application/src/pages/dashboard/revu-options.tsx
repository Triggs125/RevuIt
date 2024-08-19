import { IconButton, Menu } from "react-native-paper";
import { Revu } from "../../../utils/types";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../../utils/theme";
import { useShare } from "../../hooks/useShare.hook";
import { ColorChangerModal } from "../../components/color-changer-modal";
import { useChangePinnedMutation } from "../../redux/edit-revu.api.slice";

type RevuOptionsProps = {
  revu: Revu;
}

const RevuOptions = ({ revu }: RevuOptionsProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { handleShare } = useShare();

  const [changePinned] = useChangePinnedMutation();

  const [isOpen, setIsOpen] = useState(false);
  const handlePress = useCallback(() => {
    setIsOpen(true);
    console.log('Option Press:', revu.revuId)
  }, [revu.revuId]);

  const handlePinPress = useCallback(() => {
    console.log(`${revu.pinned ? 'Unpinned' : 'Pinned'} Pressed`);
    changePinned({ revu });
  }, [revu]);

  const iconButton = (
    <IconButton
      icon="dots-vertical"
      size={32}
      onPress={handlePress}
      style={{
        marginRight: 0
      }}
    />
  );

  return (
    <>
      <Menu
        visible={isOpen}
        anchor={iconButton}
        onDismiss={() => setIsOpen(false)}
        contentStyle={{
          backgroundColor: theme.colors.white
        }}
      >
        <Menu.Item
          leadingIcon="share"
          title={t('share')}
          onPress={() => handleShare(revu.revuId)}
        />
        <Menu.Item
          leadingIcon={revu.pinned === true ? 'pin-off' : 'pin'}
          title={t(revu.pinned === true ? 'unpin' : 'pin-to-top')}
          onPress={handlePinPress}
        />
        <ColorChangerModal revu={revu} showText />
      </Menu>
    </>
  )
}

export { RevuOptions };
