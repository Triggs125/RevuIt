import { NestableDraggableFlatList, ScaleDecorator } from "react-native-draggable-flatlist"
import { RevuCard } from "./revu-card";
import { useEffect, useMemo, useState } from "react";
import { Revu } from "../../../utils/types";
import { ActivityIndicator, List } from "react-native-paper";
import { useTheme } from "../../../utils/theme";
import { useSetRevusOrderMutation } from "../../redux/dashboard.api.slice";

type RevuCardsProps = {
  revus: Revu[];
  header?: string;
}

const RevuCards = ({ revus, header }: RevuCardsProps) => {
  const { theme } = useTheme();
  const [setRevusOrder, { isLoading }] = useSetRevusOrderMutation()

  const orderedRevus = useMemo(() => {
    return revus.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }, [revus]);

  const [hasPinnedRevu, hasOthersRevu] = useMemo(() => ([revus.some(revu => revu.pinned), revus.some(revu => !revu.pinned)]), [revus]);

  return (
    <>
      {header?.length ?? 0 > 0 ? (
        <List.Subheader
          variant="displayMedium"
          style={{
            paddingBottom: 0,
            paddingTop: theme.spacing(3)
          }}
        >
          {header}
        </List.Subheader>
      ) : null}
      {isLoading ? (
        <ActivityIndicator size="large" style={{ padding: theme.spacing(2), alignSelf: 'flex-start' }} />
      ) : (
        <NestableDraggableFlatList
          data={orderedRevus}
          extraData={[hasPinnedRevu, hasOthersRevu, ...orderedRevus, header]}
          keyExtractor={({ revuId }, index) => `${revuId}-${index}`}
          onDragEnd={({ data }) => setRevusOrder(data)}
          renderItem={({ item: revu, drag }) => {
            return (
              <ScaleDecorator key={`revu-card-${revu.revuId}`}>
                <RevuCard
                  revu={revu}
                  onLongPress={drag}
                />
              </ScaleDecorator>
            )
          }}
        />
      )}
    </>
  );
}

export { RevuCards }
