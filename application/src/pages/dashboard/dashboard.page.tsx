import React, { useCallback, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Searchbar } from './search-bar/search-bar';
import { BottomActions } from '../../components/bottom-actions';
import { useOnScroll } from '../../hooks/useOnScroll.hook';
import { useTheme } from '../../../utils/theme';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Portal, Text } from 'react-native-paper';
import { useGetDashboardItems } from '../../hooks/useGetDashboardItems.hook';
import { DashboardItems } from './dashboard-items';

const DashboardPage = () => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();

  const { groups, revus, isFetching, hasError } = useGetDashboardItems();

  const [height, setHeight] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);
  const { isAtTop, onScroll, onBeginDrag, onEndDrag, searchBarStyle } = useOnScroll();

  return (
    <Portal.Host>
      <StatusBar style={theme.dark ? 'light' : 'dark'} />
      <View style={{ flexGrow: 1 }}>
        <Animated.View
          onLayout={(event) => {
            const { layout } = event.nativeEvent;
            setHeight(layout.height + layout.y);
          }}
          style={[{
            top,
            width: '100%',
            position: 'absolute',
            zIndex: 1000
          }, searchBarStyle]}
        >
          <Searchbar />
        </Animated.View>
        <ScrollView
          contentContainerStyle={{
            paddingTop: height,
            paddingBottom: bottomHeight + theme.spacing(4),
            flex: 1
          }}
        >
          {(isFetching || !groups || !revus) && (
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
          {!isFetching && !hasError && groups && revus && (
            <DashboardItems groups={groups} revus={revus} />
          )}
        </ScrollView>
        {/* <NestableScrollContainer
          onScroll={onScroll}
          onScrollBeginDrag={onBeginDrag}
          onScrollEndDrag={onEndDrag}
          scrollEventThrottle={10}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: height,
            paddingBottom: bottomHeight + theme.spacing(4)
          }}
        >
          {isFetching ? (
            <ActivityIndicator size="large" style={{ marginTop: theme.spacing(2) }} />
          ) : null}
          {isError ? (
            <Text>{t('error')}</Text>
          ) : null}
          {!isFetching && !isError ? (
            <>
              <PinnedRevus otherRevus={otherRevus} pinnedRevus={pinnedRevus} />
              <OtherRevus otherRevus={otherRevus} pinnedRevus={pinnedRevus} />
            </>
          ) : null}
        </NestableScrollContainer> */}
        <BottomActions
          onLayout={(event) => setBottomHeight(event.nativeEvent.layout.height)}
          isExtended={isAtTop}
        />
      </View>
    </Portal.Host>
  )
}

export { DashboardPage };
