import { useEffect, useState, createContext } from 'react';
import { fetchAllPages } from '@utils';

export const DataContext = createContext();

const API_URLS = [
  'https://swapi.py4e.com/api/people/',
  'https://swapi.py4e.com/api/films/',
  'https://swapi.py4e.com/api/vehicles/',
  'https://swapi.py4e.com/api/starships/'
];

const DataProvider = (props) => {
  const [ data, setData ] = useState({});

  const fetchData = async () => {
    Promise.all(API_URLS.map((URL) => fetchAllPages(URL))).then((fetchedData) => {
      setData((prevData) => ({
        ...prevData,
        people: fetchedData?.[0],
        films: fetchedData?.[1],
        vehicles: fetchedData?.[2],
        starships: fetchedData?.[3]
      }));
    });
  };

  useEffect(() => {
    console.log(`### DataProvider ALL DATA`, data);
  }, [ data ]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        data,
        setData
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataProvider;
