import { TouchableOpacity, View } from "react-native";
import { CommentType } from "../../../utils/types"
import { useGetUser } from "../../hooks/useGetUser.hook";
import { Avatar, Button, IconButton, Text } from "react-native-paper";
import { useTheme } from "../../../utils/theme";
import { useMemo, useState } from "react";
import { CommentTime } from "./comment-time";

type CommentProps = {
  comment: CommentType;
}

const Comment = ({ comment }: CommentProps) => {
  const { theme } = useTheme();

  const { user } = useGetUser(comment.createdBy);
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
        flexShrink: 1,
        paddingLeft: theme.spacing(1.5)
      }}
    >
      <Avatar.Text label={initials} size={42} style={{ marginTop: theme.spacing() }} />
      <View
        style={{
          flexShrink: 1,
          flexGrow: 1
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Text variant="titleMedium">
            {user.name}{'  '}
            <CommentTime comment={comment} />
          </Text>
          <IconButton
            onPress={() => { }}
            style={{
              margin: 0
            }}
            icon="dots-horizontal"
            iconColor={theme.colors.gray.main}
          />
        </View>
        <TouchableOpacity
          onPress={() => setLinesFull(!linesFull)}
          style={{
            flexShrink: 1,
            flexGrow: 1
          }}
        >
          <Text
            variant="bodyMedium"
            numberOfLines={!linesFull ? 3 : undefined}
            style={{
              flex: 1,
              flexWrap: 'wrap',
              flexShrink: 1,
              flexGrow: 1
            }}
          >
            {comment.description}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export { Comment };
