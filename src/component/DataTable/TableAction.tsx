import React, { useState } from "react";
import { IDataItem, useDataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";

type Props = {
  data: IDataItem;
  index: number;
};

function TableAction({ data, index }: Props) {
  const { editData, deleteData } = useDataContext();
  const [val, setVal] = useState<string>(data.name || "-");
  const [modal, setModal] = useState<boolean | "Edit" | "Delete">(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(modal === "Edit") {
            editData(index, {...data, name: val})
        } else if(modal === "Delete") {
            deleteData(index)
        }
        setModal(false)
    }

  return (
    <div>
      <button onClick={(e) => setModal("Edit")}>Edit</button>

      <button onClick={(e) => setModal("Delete")}>Delete</button>
      <Modal open={!!modal}>
        <div>
            <p>
                {modal === "Edit" ? "Edit" : "Delete"} {`${index + 1}`}
            </p>
          <form onSubmit={handleSubmit}>
            {modal === "Edit" ? (
              <input
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
            ) : null}
            <div>
              <button onClick={() => setModal(false)}>Cancel</button>
              <button type="submit">{modal === "Edit" ? "Save" : "Confirm"} </button>
            </div>
          </form>
        </div>
        
      </Modal>
    </div>
  );
}

export default TableAction;
