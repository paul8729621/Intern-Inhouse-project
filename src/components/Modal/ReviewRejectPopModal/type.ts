export interface ReviewRejectModalProps {
  isOpen: boolean;
  reviewer: { id: number; name: string } | null;
  onClose: () => void;
  onSubmit: (payload: ReviewRejectPayload) => void;
}

export interface ReviewRejectPayload {
  reviewerId: number;
  reason: string;
  notice?: string;
  image?: File;
}
