import { useMemo } from "react";
import { Group } from "../../../utils/types";
import { GroupCard } from "../../components/group/group-card";
import { Divider } from "react-native-paper";

type DashboardItemsProps = {
  groups: Group[];
}

const DashboardItems = ({ groups }: DashboardItemsProps) => {
  const items = useMemo(() => {
    const items: JSX.Element[] = [];
    groups.forEach((group, index) => {
      items.push(<GroupCard key={`group-${group.groupId}`} group={group} />);
      if (index !== groups.length - 1) items.push(<Divider />);
    });
    return items;
  }, [groups])

  return (
    <>
      {items}
    </>
  );
}

export { DashboardItems };