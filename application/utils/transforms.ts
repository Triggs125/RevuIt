import { Revu, RevuResponse } from "./types";

export const transformRevu = (revu: RevuResponse): Revu => {
  return {
    ...revu,
    createdAt: revu.createdAt?.toDate(),
    updatedAt: revu.updatedAt?.toDate()
  }
}