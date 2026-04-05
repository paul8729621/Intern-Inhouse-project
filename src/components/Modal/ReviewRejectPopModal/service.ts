import type { ReviewRejectPayload } from "./type";

export const submitReviewCorrection = async (payload: ReviewRejectPayload): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 300);
  });
};
