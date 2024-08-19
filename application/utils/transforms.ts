import { DocumentReference, Timestamp } from "firebase/firestore";
import { Rating } from "./types";

export function transformTimestamps<T>(object?: any, docId?: string): T {
  if (!object) return object;
  if (!(typeof object === 'object')) return object;

  return {
    docId,
    ...Object.fromEntries(Object.entries(object).map(([key, value]) => {
      let val = value;
      if (value instanceof Timestamp) {
        val = value.toDate().toISOString();
      }
      if (value instanceof DocumentReference) {
        val = value.path;
      }
      return [key, val];
    }))
  } as T
}

export const getRatingFromFeeling = (feeling: Rating['feeling']): number | undefined => {
  switch (feeling) {
    case 'DISLIKE':
      return 0;
    case 'MEH':
      return 3.5;
    case 'LIKE':
      return 7;
    case 'LOVE':
      return 10;
    case 'NONE':
      return undefined;
    default:
      return undefined;
  }
}
