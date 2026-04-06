import type { ReviewRejectPayload } from "./type";

export const submitReviewCorrection = async (_payload: ReviewRejectPayload): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  });
};
