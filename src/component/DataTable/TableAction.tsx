import React, { useState } from "react";
import { IDataItem, useDataContext } from "../../context/DataContext";
import Modal from "../Modal/Modal";

type Props = {
  data: IDataItem;
};

function TableAction({ data }: Props) {
  const { editData, deleteData } = useDataContext();
  const [val, setVal] = useState<string>(data.name || "-");
  const [modal, setModal] = useState<boolean | "Edit" | "Delete">(false);
  return (
    <div>
      <button onClick={(e) => setModal("Edit")}>Edit</button>

      <button onClick={(e) => setModal("Delete")}>Delete</button>
      <Modal open={!!modal}>
        <div>
          <form action="">
            {modal === "Edit" ? (
              <input
                type="text"
                value={val}
                onChange={(e) => setVal(e.target.value)}
              />
            ) : null}
            <div>
              <button>Cancel</button>
              <button>{modal === "Edit" ? "Save" : "Confirm"} </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default TableAction;
