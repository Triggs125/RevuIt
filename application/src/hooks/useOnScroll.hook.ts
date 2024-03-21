import { useCallback, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const useOnScroll = () => {
  const [isAtTop, setIsAtTop] = useState(true);
  const lastContentOffset = useSharedValue(0);
  const isScrolling = useSharedValue(false);
  const translateY = useSharedValue(0);

  const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log('onScroll')
    const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y ?? 0);
    setIsAtTop(currentScrollPosition <= 0);

    if (
      lastContentOffset.value > nativeEvent.contentOffset.y &&
      isScrolling.value
    ) {
      translateY.value = 0;
    } else if (
      nativeEvent.contentOffset.y > 200 &&
      lastContentOffset.value < nativeEvent.contentOffset.y &&
      isScrolling.value
    ) {
      translateY.value = -nativeEvent.contentOffset.y;
    }
    lastContentOffset.value = nativeEvent.contentOffset.y;
  }, []);

  const onBeginDrag = useCallback(() => {
    isScrolling.value = true;
  }, [])

  const onEndDrag = useCallback(() => {
    isScrolling.value = false;
  }, [])

  const searchBarStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(translateY.value, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
        },
      ],
    };
  });

  return { isAtTop, onScroll, onBeginDrag, onEndDrag, searchBarStyle };
}

export { useOnScroll };
