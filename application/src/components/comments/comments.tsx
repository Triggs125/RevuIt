import { View } from "react-native";
import { TextField } from "../text-field";
import { useGetComments } from "../../hooks/useGetComments.hook";
import { useState } from "react";
import { ActivityIndicator, Button, Icon, List, Text } from "react-native-paper";
import { useTheme } from "../../../utils/theme";
import { useTranslation } from "react-i18next";
import { Comment } from "./comment";
import { Error } from "../error";
import { Revu } from "../../../utils/types";

type CommentsProps = {
  revu: Revu;
}

const Comments = ({ revu }: CommentsProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { comments, isFetching, isError } = useGetComments(revu);

  const [input, setInput] = useState('');
  const [commentsOpen, setCommentsOpen] = useState(false);

  if (isFetching) {
    return <ActivityIndicator />
  }

  if (isError || !comments) {
    return <Error />
  }

  return (
    <View
      style={{
        flexGrow: 1
      }}
    >
      <View
        style={{
          flexGrow: 1,
          flexShrink: 1,
          flexDirection: 'row',
          paddingBottom: theme.spacing(),
          paddingLeft: theme.spacing(1.5)
        }}
      >
        <TextField
          value={input}
          onChangeText={setInput}
          placeholder={t('describe-rating')}
          multiline
          returnKeyType="done"
          // style={{
          //   flexGrow: 1,
          //   flexShrink: 1
          // }}
        />
        <Button
          onPress={() => setCommentsOpen(!commentsOpen)}
        >
          <Icon source="comment-text-multiple" color={theme.colors.light} size={24} />
          <Icon source={commentsOpen ? "chevron-up" : "chevron-down"} color={theme.colors.gray.main} size={24} />
        </Button>
      </View>
      <List.Accordion
        expanded={commentsOpen}
        title=""
        style={{
          display: 'none'
        }}
      >
        <View
          style={{
            paddingVertical: theme.spacing(),
            gap: theme.spacing(2)
          }}
        >
          {comments.length === 0 ? (
            <Text
              variant="bodyLarge"
              style={{
                textAlign: 'center',
                color: theme.colors.gray.main
              }}
            >
              {t('no-comments')}
            </Text>
          ) : (
            comments.map((comment, index) => (
              <Comment key={`${comment.commentId}-${index}`} comment={comment} />
            ))
          )}
        </View>
      </List.Accordion>
    </View>
  )
}

export { Comments };
