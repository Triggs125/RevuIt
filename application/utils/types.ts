type Created = {
  createdAt: string;
  createdBy?: string;
}

type Updated = {
  updatedAt?: string;
  updatedBy?: string;
}

// The colors are stored in HEX format
export type Color = undefined | string;

export type Revu = Created & Partial<Updated> & {
  revuId: string;
  name: string;
  description?: string;
  groupIds?: string;
  imageUrl?: string;
  color?: string;
}

export type Group = Created & {
  groupId: string;
  name: string;
  description?: string;
  color?: Color;
  imageUrl?: string;
}

export type Rating = Created & {
  ratingId: string;
  revuId: string;
  feeling: RatingFeelings;
  description?: string;
}

export type RatingFeelings = null | 'DISLIKE'| 'MEH'| 'LIKE'| 'LOVE';

export type CommentType = Created & {
  commentId: string;
  revuId: string;
  description: string;
}
