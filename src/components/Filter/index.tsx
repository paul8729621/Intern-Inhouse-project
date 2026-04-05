import React from "react";
import styles from "./style.module.scss";
import type { FilterProps } from "./type";

const Filter = ({ items, activeKey, onChange }: FilterProps) => {
  return (
    <div className={styles.wrapper}>
      {items.map(({ key, label, count }) => {
        const isActive = key === activeKey;
        return (
          <button
            key={key}
            type="button"
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
            onClick={() => onChange(key)}
          >
            <span className={styles.label}>{label}</span>
            <span className={styles.count}>{count}명</span>
          </button>
        );
      })}
    </div>
  );
};

export default Filter;
