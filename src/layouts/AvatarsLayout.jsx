import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from '@components/layout/Navigation';
import Background from '@components/layout/Background';
import SearchBar from '@components/layout/SearchBar';
import BannerImg from '@images/banner-1.png';

const AvatarsLayout = ({ Page, ...rest }) => {
  let { className } = rest;

  const [ searchValue, setSearchValue ] = useState('');

  const updateValue = (newValue) => {
    setSearchValue(newValue);
  };

  return (
    <div className={`avatars-layout__c layout ${className}`}>
      <Navigation layout={`AVATARS`} />
      <Background className={`avatars-layout__background`} source={BannerImg} withOverlay />

      <SearchBar defaultText={`Name..`} submitValue={updateValue} />

      {Page && <Page searchValue={searchValue} />}
      <Outlet />
    </div>
  );
};

export default AvatarsLayout;
