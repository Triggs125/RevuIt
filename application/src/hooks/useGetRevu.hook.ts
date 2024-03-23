import { ParamListBase, useFocusEffect, useNavigationState } from '@react-navigation/native';
import { getRevuIdSelector } from '../../utils/selectors';
import { getRevuUnsubscribe, useGetRevuQuery } from '../redux/revus.api.slice';
import { useCallback } from 'react';

const useGetRevu = (id?: number) => {
  const revuId = useNavigationState<ParamListBase, number>(getRevuIdSelector);

  const { data: revu, isFetching, isError } = useGetRevuQuery(id?.toString() ?? revuId.toString());

  useFocusEffect(useCallback(() => {
    return getRevuUnsubscribe?.();
  }, []));

  return { revu, isFetching, isError };
}

export { useGetRevu };
