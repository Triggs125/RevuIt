import { ScrollView, View } from "react-native"
import { Label } from "./label"
import { useTheme } from "../../../utils/theme";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useGetDimensions } from "../../hooks/useGetDimensions.hook";
import { Return, Revu } from "../../../utils/types";
import { Text } from "react-native-paper";
import { AddLabel } from "./add-label";

type LabelsProps = {
  revu: Return<Revu>;
  startPosition?: number;
  hasOverflow?: boolean;
  editable?: boolean;
}

const Labels = ({ revu, startPosition = 0, hasOverflow = true, editable = false }: LabelsProps) => {
  const { theme } = useTheme();

  const scrollRef = useRef(null);
  const viewRef = useRef(null);
  const { pageX: scrollX = 0 } = useGetDimensions(scrollRef);
  const { pageX: viewX = 0 } = useGetDimensions(viewRef);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);

  const [shownLabels, setShownLabels] = useState(revu.labels ?? []);
  const labelsRemoved = useMemo(() => (revu.labels ?? []).length - shownLabels?.length, [revu.labels, shownLabels])

  useEffect(() => {
    if (!hasOverflow && viewWidth > 0 && scrollWidth > 0) {
      if (viewWidth + viewX > scrollWidth + scrollX) {
        setShownLabels(labels => {
          const newLabels = [...labels];
          newLabels.pop();
          return newLabels;
        })
      }
    }
  }, [scrollWidth, viewWidth, scrollX, viewX, hasOverflow]);

  const addLabelPress = useCallback(() => {
    console.log('Add Label Press');
  }, [])

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      onLayout={(event) => {
        const layout = event.nativeEvent.layout;
        setScrollWidth(layout.width + layout.x);
      }}
      contentContainerStyle={{
        paddingLeft: startPosition,
        paddingRight: theme.spacing(2)
      }}
    >
      <View
        ref={viewRef}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          setViewWidth(layout.width + layout.x);
        }}
        style={{
          gap: theme.spacing(),
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        {editable ? <AddLabel labels={shownLabels} /> : null}
        {shownLabels.map((label, index) => <Label key={`label-${revu.revuId}-${index}`} label={label} editable={editable} />)}
        {labelsRemoved > 0 ? (
          <Text variant="bodyLarge">+{labelsRemoved}</Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

export { Labels };
