export interface ReviewRejectDetailData {
  rejectedAt: string;
  reason: string;
  notice?: string;
  imageUrl?: string;
}

export interface ReviewRejectDetailPopModalProps {
  isOpen: boolean;
  data: ReviewRejectDetailData | null;
  onClose: () => void;
}
