import { Revu } from "../../../utils/types";
import { List, Text } from "react-native-paper";
import { useCallback, useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { useTheme } from "../../../utils/theme";
import { Labels } from "../../components/labels/labels";
import { RevuOptions } from "./revu-options";
import { useNavigation } from "@react-navigation/native";

type RevuCardProps = {
  revu: Revu;
  onLongPress?: () => void;
}

const RevuCard = ({ revu, onLongPress }: RevuCardProps) => {
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  const image = useMemo(() => {
    const url = revu.imageUrl;
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
  }, [revu.imageUrl]);

  const handleCardPress = useCallback(() => {
    console.log(`Card Pressed: ${revu.revuId}`);
    // @ts-ignore
    navigate('Revu', { revuId: revu.revuId });
  }, [revu.revuId]);

  return (
    <TouchableOpacity
      onPress={handleCardPress}
      onLongPress={onLongPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        paddingVertical: theme.spacing(),
        paddingLeft: theme.spacing(),
        marginHorizontal: theme.spacing(),
        marginVertical: theme.spacing(0.5),
        borderWidth: 1.5,
        borderColor: revu.color ?? theme.colors.gray.light,
        borderRadius: theme.roundness,
        gap: theme.spacing()
      }}
    >
      {image}
      <View style={{ gap: theme.spacing(1), flexGrow: 1, flexShrink: 1 }}>
        <Text numberOfLines={2} variant="titleMedium" style={{ lineHeight: 18 }}>{revu.name}</Text>
        {revu.description ? (
          <Text
            numberOfLines={3}
            variant="bodyMedium"
            style={{
              color: theme.colors.gray.main
            }}
          >
            {revu.description}
          </Text>
        ) : null}
        <Labels revu={revu} hasOverflow={false} />
      </View>
      <RevuOptions revu={revu} />
    </TouchableOpacity>
  );
}

export { RevuCard };
