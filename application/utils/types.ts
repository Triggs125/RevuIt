type Created = {
  createdAt: string;
  createdBy: string;
}

export type Revu = Created & {
  revuId: string;
  pinned?: boolean;
  name: string;
  description?: string;
  labels?: string[];
  imageUrl?: string;
  color?: string;
  order: number;
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
