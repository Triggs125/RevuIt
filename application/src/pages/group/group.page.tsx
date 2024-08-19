import React, { useCallback, useState } from 'react';
import { ScrollView, View } from "react-native";
import { useGetGroup } from '../../hooks/useGetGroup.hook';
import { ActivityIndicator, Divider, Portal } from 'react-native-paper';
import { GroupHeader } from '../group/group-header';
import { useTheme } from '../../../utils/theme';
import { useTranslation } from 'react-i18next';
import { Error } from '../../components/error';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../../components/back-button';
import { BottomActions } from '../../components/bottom-actions';
import { useOnScroll } from '../../hooks/useOnScroll.hook';
import { GroupItems } from './group-items';
import { GroupInfo } from './group-info';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getGroupIdSelector } from '../../../utils/selectors';

const GroupPage = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const groupId = getGroupIdSelector(navigation.getState());
  // const { params } = useRoute();
  // const groupId = (params as any)?.groupId as string | undefined;
  const { group, isFetching, isError } = useGetGroup(groupId);

  // const [addRevuItem, { isLoading }] = useAddRevuItemMutation();

  // const [height, setHeight] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);
  const { isAtTop, onScroll, onBeginDrag, onEndDrag, searchBarStyle } = useOnScroll();

  // const onMoviePress = useCallback(() => {
  //   console.log('Add Movie Pressed');
  // }, []);
  // const onBarcodePress = useCallback(() => {
  //   console.log('Add Barcode Pressed');
  // }, []);

  if (isFetching) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'space-between'
        }}
      >
        <BackButton />
        <ActivityIndicator size="large" />
        <View />
      </SafeAreaView>
    )
  }

  if (!group || isError) {
    return (
      <SafeAreaView
        style={{
          flex: 1
        }}
      >
        <BackButton />
        <Error />
      </SafeAreaView>
    )
  }

  return (
    <Portal.Host>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.background
        }}
      >
        <GroupHeader group={group} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1
          }}
          contentContainerStyle={{
            paddingVertical: theme.spacing(2),
            gap: theme.spacing(2),
            paddingBottom: bottomHeight + theme.spacing(4)
          }}
        >
          <GroupInfo group={group} />
          <Divider style={{ marginHorizontal: theme.spacing() }} />
          <GroupItems group={group} />
        </ScrollView>
        <BottomActions
          onLayout={(event) => setBottomHeight(event.nativeEvent.layout.height)}
          isExtended={isAtTop}
        />
      </View>
    </Portal.Host>
  );
};

export { GroupPage };