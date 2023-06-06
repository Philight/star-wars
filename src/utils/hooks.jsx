import { useState, useEffect, useRef } from 'react';

export const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [ value ]);
  return ref.current;
};

export const useFetch = (url) => {
  const [ state, setState ] = useState();

  useEffect(() => {
    const dataFetch = async () => {
      const data = await (await fetch(url)).json();

      setState(data);
    };

    dataFetch();
  }, [ url ]);

  return { response: state };
};
