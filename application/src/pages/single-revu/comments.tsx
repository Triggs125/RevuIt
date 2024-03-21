import { View } from "react-native";
import { TextField } from "../../components/text-field";
import { RevuItem } from "../../../utils/types";
import { useGetComments } from "../../hooks/useGetComments.hook";
import { useState } from "react";
import { ActivityIndicator, Button, Icon, List } from "react-native-paper";
import { useTheme } from "../../../utils/theme";
import { useTranslation } from "react-i18next";
import { Comment } from "./comment";

type CommentsProps = {
  revuItem: RevuItem;
}

const Comments = ({ revuItem }: CommentsProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const { comments } = useGetComments(revuItem);

  const [input, setInput] = useState('');
  const [commentsOpen, setCommentsOpen] = useState(false);

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
          textFieldStyle={{
            flexGrow: 1
          }}
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
            padding: theme.spacing(),
            gap: theme.spacing(2),
            paddingHorizontal: theme.spacing(1.5)
          }}
        >
          {comments ? (
            comments.map((comment, index) => (
              <Comment key={`${comment.commentId}-${index}`} comment={comment} />
            ))
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </List.Accordion>
    </View>
  )
}

export { Comments };
