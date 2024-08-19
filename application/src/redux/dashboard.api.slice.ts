import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryConstraint, Unsubscribe, collection, doc, limit, onSnapshot, query, startAt, where, writeBatch } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { Group, Revu } from '../../utils/types';
import { transformTimestamps } from '../../utils/transforms';
import { returnQuery } from '../../utils/api-helpers';
import { PAGINATION_LIMIT, Pagination } from '../../utils/api-types';

export let getGroupsUnsubscribe: (() => Unsubscribe) | undefined;
export let getRevusUnsubscribe: (() => Unsubscribe) | undefined;

export const dashboardSnapshot = createApi({
  reducerPath: 'dashboardSnapshot',
  tagTypes: ['Groups', 'Revus'],
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getGroups: builder.query<Group[], string>({
      providesTags: ['Groups'],
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded: async (_, { updateCachedData, cacheEntryRemoved }) => {
        getGroupsUnsubscribe = () => {
          console.log('Get Groups Sub')
          const unsub = onSnapshot(query(collection(firestore, 'groups')), snapshot => {
            updateCachedData(() => {
              return snapshot.docs.map(doc => transformTimestamps<Group>(doc.data(), doc.id));
            });
          }, (err) => {
            updateCachedData(() => []);
            console.error(err);
          });
          return (() => {
            console.log('Get Groups Unsub');
            unsub();
          }) as Unsubscribe
        }
        await cacheEntryRemoved;
        getGroupsUnsubscribe?.();
      }
    }),
    getRevus: builder.query<Revu[], Pagination & { group?: Group, excludedGroupIds?: string[] }>({
      providesTags: ['Revus'],
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded: async ({ startIndex = 0, group }, { updateCachedData, cacheEntryRemoved }) => {
        getRevusUnsubscribe = () => {
          console.log('Get Revus Sub');
          const queryParams: QueryConstraint[] = [];
          if (group) {
            queryParams.push(where('groupId', '==', group.groupId));
          }

          const unsub = onSnapshot(query(collection(firestore, 'revus'), ...queryParams), snapshot => {
            updateCachedData(() => {
              return snapshot.docs.map(doc => transformTimestamps<Revu>(doc.data(), doc.id));
            });
          }, (err) => {
            updateCachedData(() => []);
            console.error(err);
          });
          return (() => {
            console.log('Get Revus Unsub');
            unsub();
          }) as Unsubscribe
        };
        await cacheEntryRemoved;
        getRevusUnsubscribe()();
      }
    }),
    setRevusOrder: builder.mutation<void, Revu[]>({
      queryFn: async (revus) => {
        const batch = writeBatch(firestore);
        let count = 0;
        revus.forEach(revu => {
          count += 1;
          batch.update(doc(firestore, `revus/${revu.revuId}`), { order: count })
        });
        return returnQuery(batch.commit(), undefined);
      }
    })
  })
});

export const {
  useGetRevusQuery,
  useGetGroupsQuery,
  useSetRevusOrderMutation
} = dashboardSnapshot;
