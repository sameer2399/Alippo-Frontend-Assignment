import React, { useState } from "react";
import { IDataItem, useDataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";
import styles from "./DataTable.module.css";

type ModalOpen = "Edit" | "Delete" | false;

interface ModalActionProps  {
  index: number;
  modal: ModalOpen;
  data: IDataItem;
  handleClose: () => void;
}

const ModalAction = ({modal, index, data, handleClose}:ModalActionProps) => {
  

  const [val, setVal] = useState<string>(data.name || "-");
  const { editData, deleteData } = useDataContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (modal === "Edit") {
      editData(index, { ...data, name: val });
    } else if (modal === "Delete") {
      deleteData(index);
    }
    handleClose();
  };



return <Modal open={!!modal}>
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
        <button className={styles.delete} onClick={handleClose}>
          Cancel
        </button>
        <button className={styles.edit} type="submit">
          {modal === "Edit" ? "Save" : "Confirm"}{" "}
        </button>
      </div>
    </form>
  </div>
</Modal>

}

type Props = {
  data: IDataItem;
  index: number;
};



function TableAction({ data, index }: Props) {
  
  
  const [modal, setModal] = useState<ModalOpen>(false);

  const handleClose = () => {

    setModal(false);
  }
  
 

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
      {modal? <ModalAction modal={modal} index={index} data={data} handleClose={handleClose}/> : null}
    </div>
  );
}

export default TableAction;
