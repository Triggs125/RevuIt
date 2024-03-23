import { NestableDraggableFlatList, ScaleDecorator } from "react-native-draggable-flatlist"
import { RevuCard } from "./revu-card";
import { useEffect, useMemo, useState } from "react";
import { Revu } from "../../../utils/types";
import { List } from "react-native-paper";
import { useTheme } from "../../../utils/theme";

type RevuCardsProps = {
  revus: Revu[];
  header?: string;
}

const RevuCards = ({ revus, header }: RevuCardsProps) => {
  const { theme } = useTheme();

  const [orderedRevus, setOrderedRevus] = useState(revus);
  useEffect(() => {
    setOrderedRevus(orderedRevus);
    // TODO: Set the new order in firestore
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
      <NestableDraggableFlatList
        data={orderedRevus}
        extraData={[hasPinnedRevu, hasOthersRevu]}
        keyExtractor={({ revuId }, index) => `${revuId}-${index}`}
        onDragEnd={({ data }) => setOrderedRevus(data)}
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
    </>
  );
}

export { RevuCards }
