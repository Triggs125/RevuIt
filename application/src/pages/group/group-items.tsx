import { ActivityIndicator, Divider, List } from "react-native-paper";
import { Group } from "../../../utils/types";
// import { useTheme } from "../../../utils/theme";
import { useKeyboardOffset } from "../../hooks/useKeyboardOffset.hook";
import { Error } from "../../components/error";
import { RevuCard } from "../../components/revu/revu-card";
import { useGetRevus } from "../../hooks/useGetRevus.hook";

type GroupItemsProps = {
  group: Group;
}

const GroupItems = ({ group }: GroupItemsProps) => {
  // const { theme } = useTheme();
  const keyboardOffset = useKeyboardOffset();

  const { revus, isFetching, isError } = useGetRevus(group);

  if (isFetching) {
    return (
      <ActivityIndicator size="large" />
    )
  }

  if (isError || !revus) {
    return <Error />
  }

  return (
    <List.Section
      style={{
        marginBottom: keyboardOffset
      }}
    >
      {revus.map((revu, index) => {
        return (
          <>
            <RevuCard key={`${group.groupId}-${revu.revuId}`} revu={revu} />
            {index !== revus.length - 1 ? <Divider /> : null}
          </>
        )
      })}
    </List.Section>
  )
}

export { GroupItems };
