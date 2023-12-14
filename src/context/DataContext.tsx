import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import axios from 'axios';

export type IDataItem = {
  name: string | null;
  age: number;
  city: string;
  pinCode: string | null;
}

interface IDataContext {
  data: IDataItem[];
  loading: boolean;
  editData: (index: number, newData: IDataItem) => void;
  deleteData: (index: number) => void;
}

const DataContext = createContext<IDataContext | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState<IDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<IDataItem[]>('https://assets.alippo.com/catalog/static/data.json')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const editData = (index: number, newData: IDataItem) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData[index] = newData;
      return updatedData;
    });
  };

  const deleteData = (index: number) => {
    setData(prevData => {
      const updatedData = [...prevData];
      updatedData.splice(index, 1);
      return updatedData;
    });
  };

  return (
    <DataContext.Provider value={{ data, loading, editData, deleteData }}>
      {children}
    </DataContext.Provider>
  );
};

const useDataContext = (): IDataContext => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

export { DataProvider, useDataContext };
