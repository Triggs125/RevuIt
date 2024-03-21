import { Avatar, Button } from "react-native-paper";
import { useTheme } from "../../../utils/theme";
import { useCallback } from "react";

const AccountIcon = () => {
  const { theme } = useTheme();
  const avatarProps = {
    size: 35,
    color: theme.colors.gray.light,
    style: {
      backgroundColor: theme.colors.gray.dark
    }
  }

  const handlePress = useCallback(() => {
    console.log('Account Icon Pressed')
  }, [])
  
  return (
    <Button
      onPress={handlePress}
      contentStyle={{
        paddingTop: 2
      }}
    >
      <Avatar.Text label="TD" {...avatarProps} />
    </Button>
  );
}

export { AccountIcon };
