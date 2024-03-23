import React, { useCallback } from 'react';
import { Image, ScrollView, View } from "react-native";
import { useGetRevu } from '../../hooks/useGetRevu.hook';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { RevuHeader } from './revu-header';
import { useTheme } from '../../../utils/theme';
import { Labels } from '../../components/labels/labels';
import { EditableText } from '../../components/editable-text';
import { RevuItems } from './revu-items';
import { useTranslation } from 'react-i18next';
import { Error } from '../../components/error';

const RevuPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { revu, isFetching, isError } = useGetRevu();

  const handleNameChange = useCallback((text: string) => {
    console.log('Name change:', text)
  }, []);
  const handleDescriptionChange = useCallback((text: string) => {
    console.log('Description change:', text)
  }, []);

  if (isFetching) {
    return (
      <ActivityIndicator size="large" />
    )
  }

  if (isError || !revu) {
    return <Error />
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background
      }}
    >
      <RevuHeader />
      <ScrollView
        style={{
          flex: 1
        }}
        contentContainerStyle={{
          paddingVertical: theme.spacing(2),
          gap: theme.spacing(2)
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: theme.spacing(2),
            paddingHorizontal: theme.spacing(2)
          }}
        >
          {revu?.imageUrl ? (
            <Image
              source={{ uri: revu.imageUrl }}
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
              value={revu?.name}
              placeholder={t('revu-name')}
              onChangeText={handleNameChange}
              size='large'
              multiline
              style={{
                flexGrow: 0
              }}
            />
            <EditableText
              value={revu?.description}
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
        <Labels revu={revu} startPosition={theme.spacing(2)} editable />
        <Divider style={{ marginHorizontal: theme.spacing() }} />
        <RevuItems revu={revu} />
      </ScrollView>
    </View>
  );
};

export { RevuPage };