import { List } from "react-native-paper";
import { Revu } from "../../../utils/types";
import { useGetRevuItems } from "../../hooks/useGetRevuItems.hook";
import { RevuItemCard } from "./revu-item";
import { useTheme } from "../../../utils/theme";
import { useKeyboardOffset } from "../../hooks/useKeyboardOffset.hook";

type RevuItemsProps = {
  revu: Revu;
}

const RevuItems = ({ revu }: RevuItemsProps) => {
  const { theme } = useTheme();
  const keyboardOffset = useKeyboardOffset();

  const { revuItems } = useGetRevuItems(revu);

  return (
    <List.Section
      style={{
        gap: theme.spacing(),
        paddingHorizontal: theme.spacing(),
        marginBottom: keyboardOffset
      }}
    >
      {revuItems.map((revuItem) => {
        return (
          <RevuItemCard key={`${revuItem.revuId}-${revuItem.revuItemId}`} revu={revu} revuItem={revuItem} />
        )
      })}
    </List.Section>
  )
}

export { RevuItems };
