import { useFocusEffect } from '@react-navigation/native';
import { getRevuUnsubscribe, useGetGroupQuery } from '../redux/revu.api.slice';
import { useCallback } from 'react';

const useGetGroup = (groupId?: string) => {
  const { data: group = null, isFetching, isError, error } = useGetGroupQuery(groupId, { skip: !groupId});
  
  useFocusEffect(useCallback(() => {
    return () => {
      getRevuUnsubscribe?.()
    };
  }, [groupId]));

  return { group, isFetching, isError, error };
}

export { useGetGroup };
