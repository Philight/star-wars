import { Outlet } from 'react-router-dom';

import Navigation from '@components/layout/Navigation';
import Background from '@components/layout/Background';

import BannerImg from '@images/banner-1.png';
// import "@css/layout/landing-layout.css";

const DetailLayout = ({ Page, ...rest }) => {
  let { className } = rest;

  return (
    <div className={`detail-layout__c layout ${className}`}>
      <Navigation layout={`DETAIL`} />
      <Background className={`detail-layout__background`} source={BannerImg} withOverlay />

      {Page && <Page />}
      <Outlet />
    </div>
  );
};

export default DetailLayout;
