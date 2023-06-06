import { useRef } from 'react';
import Shape from '@components/graphic/Shape';

const RadioFilter = (props) => {
  let { className, values, updateFilter } = props;

  const containerRef = useRef(null);
  const filterKeys = !!values && Object.keys(values);

  const toggleValue = (key) => () => {
    const updatedValues = values;
    updatedValues[key].active = !updatedValues[key].active;
    updateFilter(updatedValues);
  };

  return (
    <div className={`radio-filter__c flex-col ${className}`} ref={containerRef}>
      {!!filterKeys &&
        filterKeys.map((key) => (
          <div
            className={`radio-filter__value flex-center-v ${values[key].active && 'active'}`}
            key={key}
            onClick={toggleValue(key)}
          >
            <span className={`radio-filter__value-name flex-center body-text`}>
              {values[key].label}
            </span>
            <figure className={`radio-filter__value-toggle`}>
              <Shape className={`polygon`} />
            </figure>
          </div>
        ))}
    </div>
  );
};

export default RadioFilter;
