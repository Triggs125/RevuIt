import { DocumentReference, Timestamp } from "firebase/firestore";

export type SaveType<T> = Omit<T, 'docId'>;
export type ApiResponse<T> = Omit<T, 'createdBy' | 'createdAt' | 'updatedBy' | 'updatedAt'> & {
  createdBy?: DocumentReference;
  createdAt: Timestamp;
  updatedBy?: DocumentReference;
  updatedAt?: Timestamp;
}

export const PAGINATION_LIMIT = 25;
export type Pagination = {
  startIndex?: number;
}