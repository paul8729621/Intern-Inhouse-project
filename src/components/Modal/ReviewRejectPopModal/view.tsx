import { useEffect, useState } from "react";
import { BaseModal } from "../../BaseComponents";
import { useToastStore } from "../../../stores/toast";
import type { ReviewRejectModalProps } from "./type";
import styles from "./style.module.scss";

export default function ReviewRejectModalView({
  isOpen,
  reviewer,
  onClose,
  onSubmit,
}: ReviewRejectModalProps) {
  const { showToast } = useToastStore();
  const [reason, setReason] = useState("");
  const [notice, setNotice] = useState("");
  const [image, setImage] = useState<File | undefined>(undefined);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setReason(""); setNotice(""); setImage(undefined); setPreviewUrl(undefined);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!image) { setPreviewUrl(undefined); return; }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  if (!isOpen || !reviewer) return null;

  const handleSubmit = () => {
    if (!reason.trim()) { showToast("사유를 입력해 주세요", "error"); return; }
    onSubmit({ reviewerId: reviewer.id, reason, notice, image });
  };

  return (
    <BaseModal isOpen={isOpen} onHide={onClose} minWidth={420} maxWidth={440}>
      <div className={styles.reviewRejectModal}>
        <h2 className={styles.reviewRejectModal__title}>후기 반려</h2>

        <div className={styles.reviewRejectModal__section}>
          <label className={styles.reviewRejectModal__label}>대상</label>
          <div>{reviewer.name}</div>
        </div>

        <div className={styles.reviewRejectModal__section}>
          <label className={styles.reviewRejectModal__label}>이미지 (선택)</label>
          <label className={styles.reviewRejectModal__imagePlaceholder}>
            <input
              key={isOpen ? "open" : "closed"}
              type="file"
              accept="image/*"
              className={styles.reviewRejectModal__inputHidden}
              onChange={(e) => setImage(e.target.files?.[0])}
            />
            <div className={styles.reviewRejectModal__imageContent}>
              {previewUrl
                ? <img src={previewUrl} alt="업로드된 이미지" className={styles.reviewRejectModal__preview} />
                : <span>수정 요청할 이미지를 넣어주세요</span>}
            </div>
          </label>
        </div>

        <div className={styles.reviewRejectModal__section}>
          <label className={styles.reviewRejectModal__label}>수정 요청 사항</label>
          <textarea
            className={styles.reviewRejectModal__textarea}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <div className={styles.reviewRejectModal__section}>
          <label className={styles.reviewRejectModal__label}>유의사항</label>
          <textarea
            className={styles.reviewRejectModal__textarea}
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            placeholder="ex) 지속적으로 가이드 위반 시 계정이 제한될 수 있습니다."
          />
        </div>

        <div className={styles.reviewRejectModal__buttonGroup}>
          <button
            type="button"
            className={`${styles.reviewRejectModal__button} ${styles["reviewRejectModal__button--close"]}`}
            onClick={onClose}
          >
            닫기
          </button>
          <button
            type="button"
            className={`${styles.reviewRejectModal__button} ${styles["reviewRejectModal__button--submit"]}`}
            onClick={handleSubmit}
          >
            사유 등록
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
