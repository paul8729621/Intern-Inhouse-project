import React from "react";
import { BaseModal } from "../../BaseComponents";
import type { ReviewRejectDetailPopModalProps } from "./type";
import styles from "./style.module.scss";

export default function ReviewRejectDetailPopModalView({
  isOpen,
  data,
  onClose,
}: ReviewRejectDetailPopModalProps) {
  if (!isOpen || !data) return null;

  const { rejectedAt, reason, notice, imageUrl } = data;

  return (
    <BaseModal isOpen={isOpen} onHide={onClose} minWidth={500} maxWidth={560}>
      <div className={styles.reviewRejectDetailModal}>
        <div className={styles.reviewRejectDetailModal__header}>
          <h2 className={styles.reviewRejectDetailModal__title}>반려 사유</h2>
          <span className={styles.reviewRejectDetailModal__rejectedAt}>
            {rejectedAt} 반려됨
          </span>
        </div>

        <div className={styles.reviewRejectDetailModal__section}>
          <h3 className={styles.reviewRejectDetailModal__sectionTitle}>이미지 (선택)</h3>
          {imageUrl ? (
            <div className={styles.reviewRejectDetailModal__imageWrapper}>
              <img
                src={imageUrl}
                alt="반려 이미지"
                className={styles.reviewRejectDetailModal__image}
              />
            </div>
          ) : (
            <div className={styles.reviewRejectDetailModal__reasonBox}>
              등록된 이미지가 없습니다.
            </div>
          )}
        </div>

        <div className={styles.reviewRejectDetailModal__section}>
          <h3 className={styles.reviewRejectDetailModal__sectionTitle}>수정 요청 사항</h3>
          <div className={styles.reviewRejectDetailModal__reasonBox}>{reason}</div>
        </div>

        {notice && (
          <div className={styles.reviewRejectDetailModal__section}>
            <h3 className={styles.reviewRejectDetailModal__sectionTitle}>유의사항</h3>
            <div className={styles.reviewRejectDetailModal__reasonBox}>{notice}</div>
          </div>
        )}

        <div className={styles.reviewRejectDetailModal__footer}>
          <button onClick={onClose}>닫기</button>
        </div>
      </div>
    </BaseModal>
  );
}
