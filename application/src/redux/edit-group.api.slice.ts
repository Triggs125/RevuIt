import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { Timestamp, addDoc, collection, doc, documentId, setDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebaseConfig';
import { Group } from '../../utils/types';

export const editRevuSnapshot = createApi({
  reducerPath: 'editRevuSnapshot',
  tagTypes: ['Revus', 'Revu', 'RevuItems', 'RevuItemRating'],
  baseQuery: fakeBaseQuery(),
  endpoints: builder => ({
    saveGroup: builder.mutation<string | null, { group: Partial<Group> }>({
      queryFn: async ({ group }) => {
        const newGroup: any = {
          ...group,
          updatedAt: Timestamp.now()
        }
        if (group.groupId) {
          // Save the group
          return await updateDoc(doc(firestore, `groups/${group.groupId}`), newGroup)
            .then(() => ({ data: group.groupId ?? null }))
            .catch(err => (console.error(err), { error: true }));
        }
        
        // Add a new group
        const newDoc = doc(collection(firestore, 'groups'));
        newGroup.createdAt = Timestamp.now();
        newGroup.groupId = newDoc.id;
        return await setDoc(newDoc, newGroup)
          .then(() => ({ data: newDoc.id }))
          .catch(err => (console.error(err), { error: true }));
      }
    })
  })
});

export const { useSaveGroupMutation } = editRevuSnapshot;
