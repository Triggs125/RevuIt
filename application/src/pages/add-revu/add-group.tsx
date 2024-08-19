import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { useGetRevuQuery } from "../../redux/revu.api.slice";
import { useMemo } from "react";

type AddGroupProps = {
  revuId: string;
};

const AddGroup = ({ revuId }: AddGroupProps) => {
  const { t } = useTranslation();

  const { data: revu, isLoading, isError } = useGetRevuQuery(revuId);

  const button = useMemo(() => {
    if (revu?.groupIds) {

    }
  }, [revu]);

  return (
    <View>
      <Text>
        {t('revu-linked-groups')}
      </Text>
      <View>

      </View>
    </View>
  )
};

export { AddGroup };
