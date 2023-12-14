import React from 'react'
import { IDataItem, useDataContext } from '../../context/DataContext'
import TableAction from './TableAction';

function DataTable() {
  const { data, loading, editData, deleteData } = useDataContext();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>SL no.</th>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
            <th>Pin Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => <tr key={index}>
            <td>{index+1}</td>
            <td>{item.name || "-"}</td>
            <td>{item.age || "-"}</td>
            <td>{item.city || "-"}</td>
            <td>{item.pinCode || "-"}</td>
            <td>
              <TableAction data={item}/>
            </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable