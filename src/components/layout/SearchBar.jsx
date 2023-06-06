import { useState } from 'react';
import Icon from '@components/graphic/Icon';
import Shape from '@components/graphic/Shape';

const SearchBar = (props) => {
  let { className, defaultText, updateValue, submitValue } = props;

  const [ value, setValue ] = useState('');
  const [ searchValue, setSearchValue ] = useState('');
  const [ isFocused, setIsFocused ] = useState(false);

  const updateInputValue = (newValue) => {
    setValue(newValue);
    if (updateValue) {
      updateValue(newValue);
    }
  };

  const updateSearchValue = (newValue) => {
    setSearchValue(newValue);
    if (submitValue) {
      submitValue(newValue);
    }
  };

  const handleFocus = (isFocusedFlag) => () => {
    setIsFocused(isFocusedFlag);
  };

  const handleTyping = () => (event) => {
    updateInputValue(event.target.value);
  };

  const handleKeyDown = () => (event) => {
    const keyCode = event.keyCode || event.which;
    if (keyCode === 13 || event.key === 'Enter') {
      updateSearchValue(event.target.value);
    }
  };

  const handleReset = () => () => {
    updateInputValue('');
    updateSearchValue('');
  };

  return (
    <div
      className={`
			search-bar__c ${className} flex-center-v ${isFocused && 'focused'} ${searchValue && 'searching'}
		`}
    >
      <Icon className={`search`} style={{}} icon='search-1' />

      <input
        className={`
				search-bar__input ${className} flex-center body-text 
			`}
        type='text'
        placeholder={defaultText || `Placeholder text..`}
        value={value}
        onFocus={handleFocus(true)}
        onBlur={handleFocus(false)}
        onChange={handleTyping()}
        onKeyDown={handleKeyDown()}
      />

      <Shape className={`search-bar__divider`} />
      <Icon className={`reset`} style={{}} icon='star-wars-x-mark' onClick={handleReset()} />
    </div>
  );
};

export default SearchBar;
