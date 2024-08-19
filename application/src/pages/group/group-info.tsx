import { Image, View } from "react-native";
import { useTheme } from "../../../utils/theme";
import { EditableText } from "../../components/editable-text";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { Group } from "../../../utils/types";

type GroupInfoProps = {
  group: Group;
}

const GroupInfo = ({ group }: GroupInfoProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleNameChange = useCallback((text: string) => {
    console.log('Name change:', text)
  }, []);
  const handleDescriptionChange = useCallback((text: string) => {
    console.log('Description change:', text)
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: theme.spacing(2),
        paddingHorizontal: theme.spacing(2)
      }}
    >
      {group.imageUrl ? (
        <Image
          source={{ uri: group.imageUrl }}
          style={{
            width: 90,
            height: 90,
            marginTop: theme.spacing(1),
            borderRadius: theme.roundness
          }}
        />
      ) : null}
      <View
        style={{
          justifyContent: 'flex-start',
          flexDirection: 'column',
          flexShrink: 1,
          flexGrow: 1
        }}
      >
        <EditableText
          value={group.name}
          placeholder={t('revu-name')}
          onChangeText={handleNameChange}
          size='large'
          multiline
          style={{
            flexGrow: 0
          }}
        />
        <EditableText
          value={group.description}
          placeholder={t('revu-description')}
          onChangeText={handleDescriptionChange}
          color={theme.colors.gray.dark}
          multiline
          style={{
            flexGrow: 0
          }}
        />
      </View>
    </View>
  )
}

export { GroupInfo };
