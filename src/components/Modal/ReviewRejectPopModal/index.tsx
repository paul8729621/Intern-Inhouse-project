import React from "react";
import ReviewRejectModalView from "./view";
import type { ReviewRejectModalProps } from "./type";

const ReviewRejectModal: React.FC<ReviewRejectModalProps> = (props) => {
  return <ReviewRejectModalView {...props} />;
};

export default ReviewRejectModal;
