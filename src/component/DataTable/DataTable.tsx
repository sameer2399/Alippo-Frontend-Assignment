import React from "react";
import { useDataContext } from "../../context/DataContext";
import TableAction from "./TableAction";
import styles from "./DataTable.module.css";
import Shimmer from "./Shimmer";

const tableHeader = ["SL NO.", "Name", "Age", "City", "Pin Code", "Actions"];

function DataTable() {
  const { data, loading } = useDataContext();

  //If loading is true, show shimmer UI
  if (loading) {
    return <Shimmer />;
  }

  return (
    <div>
      <table className={styles.table}>
        <thead className={styles.tableHeading}>
          <tr>
            {tableHeader.map((item, index) => (
              <th className={styles.tableHeader} key={index}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className={styles.tableHeader} key={index}>
              <td className={styles.tableData}>{index + 1}</td>
              <td className={styles.tableData}>{item.name || "-"}</td>
              <td className={styles.tableData}>{item.age || "-"}</td>
              <td className={styles.tableData}>{item.city || "-"}</td>
              <td className={styles.tableData}>{item.pinCode || "-"}</td>
              <td className={styles.tableData}>
                <TableAction data={item} index={index} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
