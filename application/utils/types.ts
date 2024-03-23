import { DocumentReference, Timestamp } from "firebase/firestore";

type Created = {
  createdAt: Date;
  createdBy: DocumentReference;
}

type Updated = {
  updatedAt: Date;
  updatedBy: DocumentReference;
}

export type Revu = Created & Partial<Updated> & {
  revuId: string;
  pinned?: boolean;
  name: string;
  description?: string;
  labels?: string[];
  imageUrl?: string;
  color?: string;
  order: number;
}

export type RevuResponse = Revu & {
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export type RevuItem = Created & {
  revuItemId: string;
  revuId: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export type RevuItemRating = Created & {
  revuItemRatingId: string;
  revuItemId: string;
  feeling: RatingFeelings;
  description?: string;
}

export type RatingFeelings = undefined | 'DISLIKE'| 'MEH'| 'LIKE'| 'LOVE';

export type CommentType = {
  commentId: string;
  revuItemId: string;
  userId: string;
  comment: string;
}
