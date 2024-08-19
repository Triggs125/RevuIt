import { KeyboardAvoidingView, ScrollView, View } from "react-native"
import { TextField } from "../../components/text-field";
import { useCallback, useEffect, useState } from "react";
import { ColorChangerModal } from "../../components/color-changer-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../../utils/theme";
import { useTranslation } from "react-i18next";
import { Button, Text } from "react-native-paper";
import { useKeyboardOffset } from "../../hooks/useKeyboardOffset.hook";
import { useSaveRevuMutation } from "../../redux/edit-revu.api.slice";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useGetGroup } from "../../hooks/useGetGroup.hook";
import { AddRevuHeader } from "./add-revu-header";

const AddRevuPage = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const keyboardOffset = useKeyboardOffset();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const groupId = (params as { groupId: string | undefined })?.groupId;

  const { group } = useGetGroup(groupId);
  const [saveRevuMutation, { isLoading, isError, isSuccess, data }] = useSaveRevuMutation();
  
  const [state, setState] = useState({ name: '', description: '', color: '' });
  const { name, description, color } = state;
  useEffect(() => {
    if (group) {
      setState(group as any);
    }
  }, [group])
  
  const [errors, setErrors] = useState({ name: false, description: false, color: false });

  const saveRevu = useCallback(() => {
    if (Object.values(errors).some(Boolean)) {
      return;
    }

    saveRevuMutation({ revu: state })
      .unwrap()
      .then(id => {
        (navigate as any)('Revu', { revuId: id || groupId });
      });
  }, [state, errors, groupId]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: keyboardOffset,
        gap: theme.spacing(2)
      }}
    >
      <AddRevuHeader />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          gap: theme.spacing(2),
          paddingHorizontal: theme.spacing(2)
        }}
      >
        <ColorChangerModal color={color} onChange={color => setState(state => ({ ...state, color }))} />
        <View
          style={{
            flex: 1,
            gap: theme.spacing(2)
          }}
        >
          <TextField
            value={name}
            label={t('name')}
            onChange={event => {
              const text = event.nativeEvent.text;
              setState(state => ({ ...state, name: text }));
              setErrors(errors => ({ ...errors, name: !text }));
            }}
            helpText={errors.name ? t('revu-save-name-error') : ' '}
            helpTextStyle={{
              color: theme.colors.error
            }}
            required
          />
          <TextField
            value={description}
            label={t('description')}
            onChangeText={description => setState(state => ({ ...state, description }))}
          />
        </View>
      </ScrollView>
      <SafeAreaView
        style={{
          paddingHorizontal: theme.spacing(2),
          paddingBottom: theme.spacing()
        }}
      >
        {!!isError && (
          <Text
            variant="labelMedium"
            style={{
              color: theme.colors.error,
              textAlign: 'center',
              marginBottom: theme.spacing()
            }}
          >
            {t('save-error')}
          </Text>
        )}
        <Button
          style={{
            backgroundColor: theme.colors.primary,
          }}
          textColor={theme.colors.text}
          onPress={saveRevu}
          loading={isLoading}
          disabled={isLoading || Object.values(errors).some(Boolean)}
        >
          {t('revu-save')}
        </Button>
      </SafeAreaView>
    </View>
  )
}

export { AddRevuPage };
