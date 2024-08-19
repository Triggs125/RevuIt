import { useMemo } from "react";
import { Group, Revu } from "../../../utils/types";
import { RevuCard } from "../../components/revu/revu-card";
import { GroupCard } from "../../components/group/group-card";
import { Divider } from "react-native-paper";

type DashboardItemsProps = {
  groups: Group[];
  revus: Revu[];
}

const DashboardItems = ({ groups, revus }: DashboardItemsProps) => {
  const items = useMemo(() => {
    const items: JSX.Element[] = [];
    groups.forEach((group, index) => {
      items.push(<GroupCard key={`group-${group.groupId}`} group={group} />);
      items.push(<Divider />);
    });
    revus.forEach((revu, index) => {
      items.push(<RevuCard key={`revu-${revu.revuId}`} revu={revu} />);
      items.push(<Divider />);
    })
    return items;
  }, [groups, revus])

  return (
    <>
      {items}
    </>
  );
}

export { DashboardItems };