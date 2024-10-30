import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { QueryConstraint, Unsubscribe, collection, doc, endAt, limit, onSnapshot, orderBy, query, startAt, where, writeBatch } from 'firebase/firestore';
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
      onCacheEntryAdded: async (searchText, { updateCachedData, cacheEntryRemoved }) => {
        getGroupsUnsubscribe = () => {
          console.log('Get Groups Sub');
          const queryItems: QueryConstraint[] = [];
          if (searchText) {
            const searchTerm = searchText.toLowerCase();
            const strlength = searchTerm.length;
            const strFrontCode = searchTerm.slice(0, strlength - 1);
            const strEndCode = searchTerm.slice(strlength - 1, searchTerm.length);
            const endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
            console.log('searchText', searchTerm, endCode);
            queryItems.push(where('name', '>=', searchTerm));
            queryItems.push(where('name', '<', endCode));
          }
          const unsub = onSnapshot(query(collection(firestore, 'groups'), ...queryItems), snapshot => {
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
