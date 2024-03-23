import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Unsubscribe, collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { Revu, RevuResponse } from '../../utils/types';
import { getUserDoc } from '../../utils/firestore';
import { transformRevu } from '../../utils/transforms';

export let getRevusUnsubscribe: Unsubscribe;
export let getRevuUnsubscribe: Unsubscribe;

export const revusSnapshot = createApi({
  reducerPath: 'revusSnapshot',
  tagTypes: ['Revus', 'Revu'],
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getRevus: builder.query<Revu[], string | undefined>({
      providesTags: ['Revus'],
      keepUnusedDataFor: 3600,
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded: async (userId, { updateCachedData, cacheEntryRemoved }) => {
        getRevusUnsubscribe = () => {
          console.log('Get Revus Sub')
          const unsub = onSnapshot(query(collection(firestore, 'revus'), where('createdBy', '==', getUserDoc(userId))), snapshot => {
            updateCachedData(() => {
              return snapshot.docs.map(doc => transformRevu(doc.data() as RevuResponse));
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
        getRevusUnsubscribe();
      }
    }),
    getRevu: builder.query<Revu | undefined, string>({
      providesTags: ['Revu'],
      keepUnusedDataFor: 3600,
      queryFn: () => ({ data: undefined }),
      onCacheEntryAdded: async (revuId, { updateCachedData, cacheEntryRemoved }) => {
        getRevuUnsubscribe = () => {
          console.log('Get Revu Sub')
          const unsub = onSnapshot(doc(firestore, `revus/${revuId}`), snapshot => {
            updateCachedData(() => {
              console.log('revu', snapshot.data())
              const revu = transformRevu(snapshot.data() as RevuResponse);
              return revu;
            });
          }, (err) => {
            console.error(err);
            updateCachedData(() => undefined);
          });
          return (() => {
            console.log('Get Revu Unsub');
            unsub();
          }) as Unsubscribe
        }
        await cacheEntryRemoved;
        getRevuUnsubscribe();
      }
    })
  })
});

export const { useGetRevusQuery, useGetRevuQuery } = revusSnapshot;
