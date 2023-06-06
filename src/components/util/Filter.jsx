import { useState, useEffect, useReducer, useRef, useContext } from 'react';

import { DataContext } from '@contexts/DataProvider';
import Icon from '@components/graphic/Icon';
import Shape from '@components/graphic/Shape';
import Background from '@components/layout/Background';
import RangeFilter from '@components/util/RangeFilter';
import SelectFilter from '@components/util/SelectFilter';
import RadioFilter from '@components/util/RadioFilter';

const filtersReducer = (state, action) => {
  let newState = { ...state };
  switch (action.type) {
  case 'initialize':
    return action.data;
  case 'reset':
    for (const attribute in newState) {
      if (attribute in newState) {
        for (const value in newState[attribute]) {
          if (value in newState[attribute]) {
            newState[attribute][value].active = true;
          }
        }
      }
    }
    return newState;
  case 'update':
    newState[action.column] = action.data;
    return newState;

  default:
    break;
  }
  return newState;
};

const Filter = (props) => {
  let { className, columns, data, updateFilteredData } = props;

  const context = useContext(DataContext);
  const [ state, dispatch ] = useReducer(filtersReducer, null);
  const [ isVisible, setIsVisible ] = useState(false);
  const resetFlag = useRef(0);
  const isReset = useRef(false);

  useEffect(() => {
    const newFilterTree = {};
    for (const col of columns) {
      const columnName = col.name;

      if (!(columnName in newFilterTree)) {
        newFilterTree[columnName] = {};
      }

      if ([ 'films', 'vehicles', 'starships' ].includes(columnName)) {
        for (const instance of context.data[columnName]) {
          const name = instance?.name || instance?.title;
          const instanceId = instance.url.split(`/${columnName}/`)[1].split('/')[0];
          if (!(name in newFilterTree[columnName])) {
            newFilterTree[columnName][instanceId] = {
              label: name,
              active: true
            };
          }
        }
      } else {
        for (const character of data) {
          const value = character[columnName];
          if (!(value in newFilterTree[columnName])) {
            newFilterTree[columnName][value] = {
              label: value,
              active: true
            };
          }
        }
      }
    }
    dispatch({
      type: 'initialize',
      data: newFilterTree
    });
    isReset.current = true;
  }, []);

  const toggleFilter = () => () => {
    setIsVisible((prevState) => !prevState);
  };

  const updateFilter = (columnName, updatedValues) => {
    dispatch({ type: 'update', column: columnName, data: updatedValues });
    if (isReset.current) {
      isReset.current = false;
    }
  };

  const resetFilter = () => (event) => {
    event.preventDefault();
    dispatch({ type: 'reset' });
    resetFlag.current = resetFlag.current + 1;
    isReset.current = true;
  };

  const applyFilter = () => (event) => {
    event.preventDefault();

    let filteredData = data.filter((item) => {
      for (const attribute in state) {
        if (attribute in state) {
          let value = item[attribute];
          if (value instanceof Array) {
            for (const url of value) {
              const id = url.split(`/${attribute}/`)[1].split('/')[0];
              if (!state[attribute][id].active) {
                return false;
              }
            }
          } else if (!state[attribute][value].active) {
            return false;
          }
        }
      }
      return true;
    });

    updateFilteredData(filteredData);
    toggleFilter()();
  };

  return (
    <div
      className={`
			filter__c ${className} ${isVisible ? 'visible' : 'hidden'}
		`}
    >
      <Icon className={`filter__toggle`} icon='filter' onClick={toggleFilter()} />

      <dialog className={`filter__modal full-screen`}>
        <Background className={`filter__modal-drop-shadow`} />

        <div className={`filter__modal-content fill-parent`}>
          <div className={`filter__modal-inner fill-parent flex-col`}>
            <div className={`filter__modal-top flex-center-v`}>
              <h4 className={`btn-text-lg`}>Filters</h4>
              <Icon
                className={`filter__modal-close`}
                icon='star-wars-x-mark'
                onClick={toggleFilter()}
              />
            </div>

            <div className={`filter__modal-filters flex-col`}>
              {columns.map((column) => (
                <div
                  key={`${column.name}-${column.type}`}
                  className={`filter__modal-filter ${column.type} flex-col`}
                >
                  <h5 className={`filter__modal-filter-heading btn-text-sm`}>
                    {column.name.replace('_', ' ')}
                  </h5>
                  {column.type === 'range' ? (
                    <RangeFilter
                      className={`filter__modal-filter--slider`}
                      values={!!state && state[column.name]}
                      updateFilter={(updatedValues) => updateFilter(column.name, updatedValues)}
                      resetFlag={resetFlag.current}
                    />
                  ) : column.type === 'select' ? (
                    <SelectFilter
                      className={`filter__modal-filter--select`}
                      values={!!state && state[column.name]}
                      updateFilter={(updatedValues) => updateFilter(column.name, updatedValues)}
                    />
                  ) : (
                    column.type === 'radio' && (
                      <RadioFilter
                        className={`filter__modal-filter--radio`}
                        values={!!state && state[column.name]}
                        updateFilter={(updatedValues) => updateFilter(column.name, updatedValues)}
                      />
                    )
                  )}
                </div>
              ))}
            </div>

            <div className={`filter__modal-actions flex-center-v`}>
              <button
                className={`filter__modal-button btn-text-lg flex-center`}
                onClick={resetFilter()}
                disabled={isReset.current}
              >
                Reset
                <Shape className={`polygon`} />
              </button>
              <button
                className={`filter__modal-button btn-text-lg flex-center`}
                onClick={applyFilter()}
              >
                Apply
                <Shape className={`polygon`} />
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Filter;
