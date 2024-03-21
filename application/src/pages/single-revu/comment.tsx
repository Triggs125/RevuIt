import { TouchableOpacity, View } from "react-native";
import { CommentType } from "../../../utils/types"
import { useGetUser } from "../../hooks/useGetUser.hook";
import { Avatar, Button, Text } from "react-native-paper";
import { useTheme } from "../../../utils/theme";
import { useMemo, useState } from "react";

type CommentProps = {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const { theme } = useTheme();

  const { user } = useGetUser(comment.userId);
  const [linesFull, setLinesFull] = useState(false);

  const initials = useMemo(() => {
    const names = user.name.split(' ');
    if (names.length === 0) return names[0][0];
    return `${names[0][0]}${names.at(-1)?.[0] ?? ''}`.trim();
  }, [user.name]);

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: theme.spacing(),
        flexShrink: 1
      }}
    >
      <Avatar.Text label={initials} size={42} />
      <TouchableOpacity
        onPress={() => setLinesFull(!linesFull)}
        style={{
          flexShrink: 1,
          flexGrow: 1
        }}
      >
        <Text variant="titleMedium">{user.name}</Text>
        <Text
          variant="bodyMedium"
          numberOfLines={linesFull ? 3 : undefined}
          style={{
            flex: 1,
            flexWrap: 'wrap',
            flexShrink: 1,
            flexGrow: 1
          }}
        >
          {comment.comment}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export { Comment };
