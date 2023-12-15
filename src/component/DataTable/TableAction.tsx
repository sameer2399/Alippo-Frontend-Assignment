import React, { useState } from "react";
import { IDataItem, useDataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";
import styles from "./DataTable.module.css";

type Props = {
  data: IDataItem;
  index: number;
};

function TableAction({ data, index }: Props) {
  const { editData, deleteData } = useDataContext();
  const [val, setVal] = useState<string>(data.name || "-");
  const [modal, setModal] = useState<boolean | "Edit" | "Delete">(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modal === "Edit") {
      editData(index, { ...data, name: val });
    } else if (modal === "Delete") {
      deleteData(index);
    }
    setModal(false);
  };

  return (
    <div>
      <button className={styles.buttonEdit} onClick={(e) => setModal("Edit")}>
        Edit
      </button>
      <button
        className={styles.buttonDelete}
        onClick={(e) => setModal("Delete")}
      >
        Delete
      </button>

      <Modal open={!!modal}>
        <div className={styles.modal}>
          <p className={styles.modalHeader}>
            {modal === "Edit" ? "Edit Name" : "Delete " + (index + 1)}
          </p>
          <form onSubmit={handleSubmit}>
            {modal === "Edit" ? (
              <input
                className={styles.modalInput}
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
            ) : null}
            <div className={styles.modalButtons}>
              <button className={styles.delete} onClick={() => setModal(false)}>
                Cancel
              </button>
              <button className={styles.edit} type="submit">
                {modal === "Edit" ? "Save" : "Confirm"}{" "}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default TableAction;
