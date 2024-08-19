import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Unsubscribe, collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { CommentType, Revu, Rating, Group } from '../../utils/types';
import { transformTimestamps } from '../../utils/transforms';

export let getRevuUnsubscribe: undefined | Unsubscribe;
export let getRevuRatingsUnsubscribe: undefined | (() => Unsubscribe);
export let getCommentsUnsubscribe: undefined | (() => Unsubscribe);

export const revuSnapshot = createApi({
  reducerPath: 'revuSnapshot',
  tagTypes: ['Group', 'RevuItemRatings', 'Comments'],
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    getRevu: builder.query<Revu | null, string | undefined>({
      providesTags: ['Group'],
      keepUnusedDataFor: 3600,
      queryFn: () => ({ data: null }),
      onCacheEntryAdded: async (revuId, { updateCachedData, cacheEntryRemoved }) => {
        getRevuUnsubscribe = onSnapshot(doc(firestore, `revus/${revuId}`), snapshot => {
          updateCachedData(() => {
            return transformTimestamps<Revu>(snapshot.data(), snapshot.id)
          });
        }, (err) => {
          console.error('Firestore error', err);
          updateCachedData(() => null);
        });
        await cacheEntryRemoved;
        getRevuUnsubscribe();
      }
    }),
    getGroup: builder.query<Group | null, string | undefined>({
      providesTags: ['Group'],
      keepUnusedDataFor: 3600,
      queryFn: () => ({ data: null }),
      onCacheEntryAdded: async (groupId, { updateCachedData, cacheEntryRemoved }) => {
        getRevuUnsubscribe = onSnapshot(doc(firestore, `groups/${groupId}`), snapshot => {
          updateCachedData(() => {
            return transformTimestamps<Group>(snapshot.data(), snapshot.id)
          });
        }, (err) => {
          console.error('Firestore error', err);
          updateCachedData(() => null);
        });
        await cacheEntryRemoved;
        getRevuUnsubscribe();
      }
    }),
    getRevuRatings: builder.query<Rating[], string>({
      providesTags: ['RevuItemRatings'],
      keepUnusedDataFor: 3600,
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded: async (revuId, { updateCachedData, cacheEntryRemoved }) => {
        getRevuRatingsUnsubscribe = () => {
          console.log('Get Revu Ratings Sub')
          const unsub = onSnapshot(query(collection(firestore, 'ratings'), where('revuId', '==', revuId)), snapshot => {
            updateCachedData(() => {
              return snapshot.docs.map(doc => transformTimestamps<Rating>(doc.data(), doc.id));
            });
          }, (err) => {
            console.error(err);
            updateCachedData(() => []);
          });
          return (() => {
            console.log('Get Revu Item Ratings Unsub');
            unsub();
          }) as Unsubscribe
        }
        await cacheEntryRemoved;
        getRevuRatingsUnsubscribe();
      }
    }),
    getComments: builder.query<CommentType[], string>({
      providesTags: ['Comments'],
      keepUnusedDataFor: 3600,
      queryFn: () => ({ data: [] }),
      onCacheEntryAdded: async (revuItemId, { updateCachedData, cacheEntryRemoved }) => {
        getCommentsUnsubscribe = () => {
          console.log('Get Comments Sub')
          const unsub = onSnapshot(query(
            collection(firestore, 'comments'),
            where('revuItemId', '==', revuItemId),
            orderBy('createdAt', 'asc')
          ), snapshot => {
            updateCachedData(() => {
              return snapshot.docs.map(doc => transformTimestamps<CommentType>(doc.data(), doc.id));
            });
          }, (err) => {
            console.error(err);
            updateCachedData(() => []);
          });
          return (() => {
            console.log('Get Comments Unsub');
            unsub();
          }) as Unsubscribe
        }
        await cacheEntryRemoved;
        getCommentsUnsubscribe();
      }
    })
  })
});

export const {
  useGetGroupQuery,
  useGetRevuQuery,
  useGetRevuRatingsQuery,
  useLazyGetCommentsQuery
} = revuSnapshot;
