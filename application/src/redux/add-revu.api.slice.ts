import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../../firebaseConfig";
import { Group, Revu } from "../../utils/types";
import { returnQuery } from "../../utils/api-helpers";
import { getUserDoc } from "../../utils/firestore-helpers";
import { ApiResponse, SaveType } from "../../utils/api-types";

export const addRevuSnapshot = createApi({
  reducerPath: 'addRevuSnapshot',
  tagTypes: ['Revus', 'Revu', 'RevuItems', 'RevuItemRating'],
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    addCategory: builder.mutation<string, void>({
      queryFn: async () => {
        const newGroupDoc = doc(collection(firestore, 'groups'));
        const newGroup: ApiResponse<Group> = {
          createdAt: Timestamp.now(),
          createdBy: getUserDoc(),
          groupId: newGroupDoc.id
        }
        return returnQuery(setDoc(newGroupDoc, newGroup), newGroupDoc.id)
      }
    }),
    addRevu: builder.mutation<string, { groupId: string; }>({
      queryFn: async ({ groupId }) => {
        const newRevuDoc = doc(collection(firestore, 'revus'));
        const newRevuItem: ApiResponse<Revu> = {
          createdAt: Timestamp.now(),
          createdBy: getUserDoc(),
          order: 0,
          revuId: newRevuDoc.id,
          groupId
        }
        return returnQuery(setDoc(newRevuDoc, newRevuItem), newRevuDoc.id)
      }
    })
  })
})

export const { useAddRevuMutation, useAddRevuItemMutation } = addRevuSnapshot;
