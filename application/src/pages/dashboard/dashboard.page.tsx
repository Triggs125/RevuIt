import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Searchbar } from './search-bar/search-bar';
import { BottomActions } from '../../components/bottom-actions';
import { useTheme } from '../../../utils/theme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Portal, Text } from 'react-native-paper';
import { useGetDashboardItems } from '../../hooks/useGetDashboardItems.hook';
import { DashboardItems } from './dashboard-items';
import { useNavigation } from '@react-navigation/native';

const DashboardPage = () => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();
  const { navigate } = useNavigation();

  const { groups, isFetching, hasError, setSearchText } = useGetDashboardItems();

  const [height, setHeight] = useState(0);

  return (
    <Portal.Host>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <View style={{ flexGrow: 1 }}>
        <Animated.View
          onLayout={(event) => {
            const { layout } = event.nativeEvent;
            setHeight(layout.height + layout.y);
          }}
          style={{
            top,
            width: '100%',
            position: 'absolute',
            zIndex: 1000
          }}
        >
          <Searchbar setSearchText={setSearchText} />
        </Animated.View>
        <ScrollView
          contentContainerStyle={{
            paddingTop: height,
            paddingBottom: theme.spacing(4),
            flex: 1
          }}
        >
          {(isFetching || !groups) && (
            <SafeAreaView
              style={{
                flex: 1,
                justifyContent: 'space-between'
              }}
            >
              <ActivityIndicator size="large" />
            </SafeAreaView>
          )}
          {hasError && (
            <Text>{t('error')}</Text>
          )}
          {!isFetching && !hasError && groups && (
            <DashboardItems groups={groups} />
          )}
        </ScrollView>
        <BottomActions onPress={() => (navigate as any)('Create Group')} />
      </View>
    </Portal.Host>
  )
}

export { DashboardPage };
