import { useNavigationState } from '@react-navigation/native';
import { getRevuIdSelector } from '../../utils/selectors';
import { useMemo } from 'react';
import { useGetRevus } from './useGetRevus.hook';

const useGetRevu = () => {
  const revuId = useNavigationState(getRevuIdSelector);
  const { revus } = useGetRevus();

  // TODO: Create a snapshot selector to get the revu
  const revu = useMemo(() => revus.find(revu => revu.revuId === revuId) ?? revus[0], [revuId]);
  
  return { revu };
}

export { useGetRevu };
