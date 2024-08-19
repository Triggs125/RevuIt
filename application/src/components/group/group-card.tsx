import { useCallback, useMemo } from "react";
import { Group } from "../../../utils/types"
import { Pressable, View } from "react-native";
import { useTheme } from "../../../utils/theme";
import { List, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

type GroupCardProps = {
  group: Group;
}

const GroupCard = ({ group }: GroupCardProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  const image = useMemo(() => {
    const url = group.imageUrl;
    if (url && url !== '') {
      return (
        <List.Image
          variant="image"
          source={{ uri: url }}
          style={{
            alignSelf: 'flex-start',
            borderRadius: theme.roundness
          }}
        />
      )
    }
    return undefined;
  }, [group.imageUrl]);

  const handleCardPress = useCallback(() => {
    console.log(`Card Pressed: ${group.groupId}`);
    // @ts-ignore
    navigate('Group', { groupId: group.groupId });
  }, [group.groupId]);

  return (
    <Pressable
      onPress={handleCardPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingVertical: theme.spacing(2),
        paddingHorizontal: theme.spacing(2),
        gap: theme.spacing()
      }}
    >
      {image}
      <View style={{ gap: theme.spacing(0.5), flexGrow: 1, flexShrink: 1 }}>
        <Text numberOfLines={2} variant="titleMedium" style={{ lineHeight: 18 }}>
          {group.name}
        </Text>
        {group.description ? (
          <Text
            numberOfLines={3}
            variant="bodyMedium"
            style={{
              color: theme.colors.gray.main
            }}
          >
            {group.description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  )
}

export { GroupCard };
