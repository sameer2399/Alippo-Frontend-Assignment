import React from "react";
import styles from "./Modal.module.css";

type Props = {
  children?: React.ReactNode;
  open?: boolean;
};

function Modal({ children, open = false }: Props) {
  if (!open) return null;
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Modal;
