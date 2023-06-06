import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useMotionValue, useTransform } from 'framer-motion';

import Navigation from '@components/layout/Navigation';
import Background from '@components/layout/Background';
import Layer from '@components/graphic/Layer';
import Icon from '@components/graphic/Icon';

import BannerImg from '@images/banner-1.png';

const ARROWS_ANIM = {
  animate: {
    opacity: [ 0.4, 1, 0.4 ],
    translateY: [ -3, 3, -3 ]
  },
  transition: {
    ease: 'linear',
    duration: 1.6,
    repeat: Infinity
  }
};

const LandingLayout = ({ Page, ...rest }) => {
  let { className } = rest;

  const [ touchStart, setTouchStart ] = useState(null);
  const [ currentTransStage, setCurrentTransStage ] = useState(0);

  const MIN_SWIPE_DISTANCE = 200;

  const mTouch = useMotionValue(-MIN_SWIPE_DISTANCE);
  const aOpacity = useTransform(mTouch, [ 0, MIN_SWIPE_DISTANCE ], [ 0, 1 ]);

  useEffect(() => {
    if (currentTransStage === 2) {
      setTimeout(() => {
        setCurrentTransStage(3);
      }, 1200);
    }
  }, [ currentTransStage ]);

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e) => {
    const movedBy = e.targetTouches[0].clientY;

    const distance = touchStart - movedBy;
    const isUpSwipe = distance > 0 ? true : false;

    if (currentTransStage === 0 && isUpSwipe) {
      mTouch.set(distance);

      if (distance >= MIN_SWIPE_DISTANCE) {
        setCurrentTransStage(1);
      }
    }
  };

  const nextStage = (stage) => () => {
    mTouch.set(MIN_SWIPE_DISTANCE);
    setCurrentTransStage(stage);
  };

  return (
    <div
      className={`landing-layout__c layout full-screen ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
    >
      <Navigation
        layout={`LANDING`}
        currentTransStage={currentTransStage}
        setCurrentTransStage={setCurrentTransStage}
      />
      <Background className={`landing-layout__background`} source={BannerImg} withOverlay />

      <section
        className={`landing-layout__continue flex-center flex-col ${
          currentTransStage > 0 && 'hidden'
        }`}
        onClick={nextStage(1)}
      >
        <label className={`h2`}>CONTINUE</label>
        <Icon
          icon='arrows'
          className={`landing-layout__arrows`}
          animate={ARROWS_ANIM.animate}
          transition={ARROWS_ANIM.transition}
        />
      </section>

      <Layer className={`landing-layout__overlay`} style={{ opacity: aOpacity }} />

      {Page && <Page currentTransStage={currentTransStage} />}
      <Outlet currentTransStage={currentTransStage} />
    </div>
  );
};

export default LandingLayout;
