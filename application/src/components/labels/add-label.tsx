import { Button, IconButton } from "react-native-paper";
import { useTheme } from "../../../utils/theme"
import { useCallback, useState } from "react";
import { EditableText } from "../editable-text";
import { useTranslation } from "react-i18next";
import { Revu } from "../../../utils/types";

type AddLabelProps = {
  labels?: Revu['labels'];
}

const AddLabel = ({ labels }: AddLabelProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const [edit, setEdit] = useState(false);

  const handleAddLabel = useCallback((text = '') => {
    console.log('Add Label:', text);
    setEdit(false);
  }, []);

  const button = (
    <IconButton
      icon='plus'
      onPress={() => setEdit(true)}
      size={18}
      style={{
        borderWidth: 1,
        borderColor: theme.colors.gray.light,
        borderRadius: 50,
        margin: 0
      }}
    />
  );

  const textInput = (
    <EditableText
      autoFocus
      onChangeText={handleAddLabel}
      filter={/[^a-zA-Z0-9 ]/g}
      placeholder={t('revu-item-add-label')}
      returnKeyType='done'
      returnKeyLabel={t('add')}
      style={{
        paddingVertical: theme.spacing(0.75),
        paddingHorizontal: theme.spacing(2),
        borderRadius: 50,
        borderWidth: 1,
        borderColor: theme.colors.gray.light
      }}
    />
  );

  return !edit ? button : textInput;
}

export { AddLabel }
