import React from 'react';
import { ScrollView, View } from "react-native";
import { useGetGroup } from '../../hooks/useGetGroup.hook';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { GroupHeader } from '../group/group-header';
import { useTheme } from '../../../utils/theme';
import { Error } from '../../components/error';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackButton } from '../../components/back-button';
import { GroupItems } from './group-items';
import { GroupInfo } from './group-info';
import { useNavigation } from '@react-navigation/native';
import { getGroupIdSelector } from '../../../utils/selectors';
import { BottomActions } from '../../components/bottom-actions';

const GroupPage = () => {
  const { theme } = useTheme();
  const { getState, navigate } = useNavigation();

  const groupId = getGroupIdSelector(getState());
  const { group, isFetching, isError } = useGetGroup(groupId);

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
          paddingBottom: theme.spacing(4)
        }}
      >
        <GroupInfo group={group} />
        <Divider style={{ marginHorizontal: theme.spacing() }} />
        <GroupItems group={group} />
      </ScrollView>
      <BottomActions onPress={() => (navigate as any)('Create Revu', { groupId })} />
    </View>
  );
};

export { GroupPage };