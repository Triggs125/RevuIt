import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Timestamp, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { returnQuery } from '../../utils/api-helpers';
import { getUserDoc } from '../../utils/firestore-helpers';
import { CommentType, Rating, Revu } from '../../utils/types';
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
    changeFeeling: builder.mutation<null, { rating?: Rating; revu: Revu; feeling: Rating['feeling'] }>({
      queryFn: async ({ rating, revu, feeling }) => {
        if (!rating) {
          const newDoc = doc(collection(firestore, 'ratings'));
          const newRevuItemRating: SaveType<ApiResponse<Rating>> = {
            ratingId: newDoc.id,
            revuId: revu.revuId,
            feeling,
            createdAt: Timestamp.now(),
            createdBy: getUserDoc()
          }
          return returnQuery(setDoc(newDoc, newRevuItemRating), null)
        }
        return returnQuery(updateDoc(
          doc(firestore, `ratings/${rating.ratingId}`),
          {
            feeling,
            updatedAt: Timestamp.now()
          }
        ), null)
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
    addComment: builder.query<null, { comment: Omit<CommentType, 'commentId' | 'createdAt'>; }>({
      queryFn: async ({ comment }) => {
        console.log('Add comment:', comment);
        const newDoc = doc(collection(firestore, 'comments'));
        const newComment: SaveType<ApiResponse<CommentType>> = {
          ...comment as any,
          commentId: newDoc.id,
          createdAt: Timestamp.now()
        }
        return returnQuery(setDoc(newDoc, newComment), null);
      }
    })
  })
});

export const { useSaveRevuMutation, useChangeFeelingMutation, useChangeColorMutation, useLazyAddCommentQuery } = editRevuSnapshot;
