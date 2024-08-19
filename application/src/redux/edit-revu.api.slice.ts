import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Timestamp, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { returnQuery } from '../../utils/api-helpers';
import { getUserDoc } from '../../utils/firestore-helpers';
import { Rating, Revu } from '../../utils/types';
import { ApiResponse, SaveType } from '../../utils/api-types';

export const editRevuSnapshot = createApi({
  reducerPath: 'editRevuSnapshot',
  tagTypes: ['Revus', 'Revu', 'RevuItems', 'RevuItemRating'],
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    saveRevu: builder.mutation<string, { revu: Pick<Revu, 'name' | 'description'> & { revuId?: string } }>({
      queryFn: async ({ revu }) => {
        const newRevu: ApiResponse<Revu> = { ...revu, updatedAt: Timestamp.now() } as any;
        if (!revu.revuId) {
          const newDoc = doc(collection(firestore, 'revus'));
          newRevu.revuId = newDoc.id;
          newRevu.createdAt = Timestamp.now();
          return returnQuery(setDoc(newDoc, newRevu), newRevu.revuId);
        }
        return returnQuery(updateDoc(doc(firestore, `revus/${newRevu.revuId}`), newRevu), newRevu.revuId);
      }
    }),
    changeFeeling: builder.mutation<void, { rating?: Rating; revu: Revu; feeling: Rating['feeling'] }>({
      queryFn: async ({ rating, revu, feeling }) => {
        if (!rating) {
          const newDoc = doc(collection(firestore, 'ratings'));
          const newRevuItemRating: SaveType<ApiResponse<Rating>> = {
            ratingId: newDoc.id,
            revuId: revu.revuId,
            feeling,
            createdAt: Timestamp.now()
          }
          return returnQuery(setDoc(newDoc, newRevuItemRating), undefined)
        }
        return returnQuery(updateDoc(
          doc(firestore, `ratings/${rating.ratingId}`),
          {
            feeling,
            updatedAt: Timestamp.now()
          }
        ), undefined)
      }
    }),
    changeColor: builder.mutation<void, { revu: Revu; color: string; }>({
      queryFn: async ({ revu, color }) => {
        return returnQuery(updateDoc(doc(firestore, `revus/${revu.revuId}`), {
          color,
          updatedAt: Timestamp.now()
        }), undefined)
      }
    }),
  })
});

export const { useSaveRevuMutation, useChangeFeelingMutation, useChangeColorMutation } = editRevuSnapshot;
