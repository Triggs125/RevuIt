import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import { NestableScrollContainer } from "react-native-draggable-flatlist"
import { Searchbar } from './search-bar/search-bar';
import { PinnedRevus } from './pinned-revus';
import { OtherRevus } from './other-revus';
import { BottomActions } from '../../components/bottom-actions';
import { useOnScroll } from '../../hooks/useOnScroll.hook';
import { useTheme } from '../../../utils/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated from 'react-native-reanimated';
import { useTranslation } from 'react-i18next';

const RevusPage = () => {
  const { t } = useTranslation();
  const { top } = useSafeAreaInsets();
  const { theme } = useTheme();
  const [height, setHeight] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);
  const { isAtTop, onScroll, onBeginDrag, onEndDrag, searchBarStyle } = useOnScroll();

  const onAddPress = useCallback(() => {
    console.log('Add Revu Pressed');
  }, []);
  const onMapPress = useCallback(() => {
    console.log('Add Map Pressed');
  }, []);
  const onMoviePress = useCallback(() => {
    console.log('Add Movie Pressed');
  }, []);
  const onBarcodePress = useCallback(() => {
    console.log('Add Barcode Pressed');
  }, []);

  return (
    <>
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
        <NestableScrollContainer
          onScroll={onScroll}
          onScrollBeginDrag={onBeginDrag}
          onScrollEndDrag={onEndDrag}
          scrollEventThrottle={10}
          contentContainerStyle={{
            paddingTop: height,
            paddingBottom: bottomHeight + theme.spacing(4)
          }}
        >
          <PinnedRevus />
          <OtherRevus />
        </NestableScrollContainer>
        <BottomActions
          onLayout={(event) => setBottomHeight(event.nativeEvent.layout.height)}
          isExtended={isAtTop}
          addButton={{ text: t('add-revu'), onPress: onAddPress }}
          actionButtons={[
            { icon: 'map-marker', onPress: onMapPress },
            { icon: 'movie-open', onPress: onMoviePress },
            { icon: 'barcode-scan', onPress: onBarcodePress },
          ]}
        />
      </View>
    </>
  )
}

export { RevusPage };
