import { useState, useEffect, useRef } from 'react';

import Icon from '@components/graphic/Icon';
import Shape from '@components/graphic/Shape';
import useDeviceDimensions from '@utils';

const SliderThumb = ({ position, index, updateIndex, step }) => {
  const { DEVICE_IS_TOUCH } = useDeviceDimensions();
  const [ isDragging, setIsDragging ] = useState(false);
  const dragStart = useRef(null);

  useEffect(() => {
    if (isDragging) {
      setTimeout(() => {
        setIsDragging(false);
      }, 50);
    }
  }, [ isDragging ]);

  const onDragStart = (e) => {
    const startX = DEVICE_IS_TOUCH ? e.targetTouches[0].clientX : e.clientX;
    dragStart.current = startX;
  };

  const onDragMove = (e) => {
    const movedX = DEVICE_IS_TOUCH ? e.targetTouches[0].clientX : e.clientX;

    const distance = movedX - dragStart.current;
    if (distance === 0) {
      return;
    }

    const coefficient = distance < 0 ? -1 : 1;

    if (!isDragging) {
      setIsDragging(true);
      updateIndex(position, coefficient);
      dragStart.current = movedX;
    }
  };

  const onDragEnd = () => {
    dragStart.current = null;
    setIsDragging(false);
  };

  return (
    <div
      className={`range-slider__thumb ${position} flex-center`}
      style={{ [position]: `${index * step}%` }}
      onTouchStart={onDragStart}
      onTouchMove={onDragMove}
      onTouchEnd={onDragEnd}
      onDragEnter={onDragStart}
      onDragOver={onDragMove}
      onDragLeave={onDragEnd}
    >
      <Icon className={`range-slider__thumb-icon`} icon='darth-vader' />
      <Shape className={`range-slider__thumb-bkg`} />
    </div>
  );
};

const RangeFilter = (props) => {
  let { className, values, updateFilter, resetFlag } = props;

  const [ leftIndex, setLeftIndex ] = useState(0);
  const [ rightIndex, setRightIndex ] = useState(0);

  const containerRef = useRef(null);

  const filterValues =
    !!values &&
    Object.keys(values).sort((a, b) => {
      return a - b;
    });
  const step = 100 / (filterValues?.length - 1); // percentage

  useEffect(() => {
    if (!!updateFilter && values) {
      for (let i = 0; i < filterValues.length; i++) {
        values[filterValues[i]].active =
          i >= leftIndex && i <= filterValues.length - 1 - rightIndex;
      }
      updateFilter(values);
    }
  }, [ leftIndex, rightIndex ]);

  useEffect(() => {
    setLeftIndex(0);
    setRightIndex(0);
  }, [ resetFlag ]);

  const setIndex = (thumbPosition, coefficient) => {
    if (thumbPosition?.toLowerCase() === 'left') {
      setLeftIndex((prevIndex) => {
        const isIncrement = coefficient >= 0;
        if (!isIncrement && prevIndex === 0) {
          return 0;
        }
        if (isIncrement && prevIndex === filterValues?.length - 2 - rightIndex) {
          return filterValues?.length - 2 - rightIndex;
        }
        return prevIndex + coefficient;
      });
    } else if (thumbPosition?.toLowerCase() === 'right') {
      setRightIndex((prevIndex) => {
        const isIncrement = coefficient >= 0;
        if (isIncrement && prevIndex === 0) {
          return 0;
        }
        // move LEFT
        if (!isIncrement && prevIndex === filterValues?.length - 2 - leftIndex) {
          return filterValues?.length - 2 - leftIndex;
        }
        return prevIndex + -1 * coefficient;
      });
    }
  };

  return (
    <div className={`range-slider__c flex-center-v ${className}`} ref={containerRef}>
      <div className={`range-slider__values body-text`}>
        <label>
          {filterValues[leftIndex]} - {filterValues[filterValues?.length - 1 - rightIndex]}
        </label>
      </div>
      <Shape className={`range-slider__track light-saber`} />
      <Shape className={`range-slider__path light-saber`} />

      <SliderThumb position='left' index={leftIndex} updateIndex={setIndex} step={step} />

      <SliderThumb position={`right`} index={rightIndex} updateIndex={setIndex} step={step} />
    </div>
  );
};

export default RangeFilter;
