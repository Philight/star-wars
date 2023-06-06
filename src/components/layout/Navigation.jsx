import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

import Icon from '@components/graphic/Icon';
import Shape from '@components/graphic/Shape';
import Layer from '@components/graphic/Layer';
import useDeviceDimensions from '@utils/useDeviceDimensions.js';

const Navigation = (props) => {
  let { className, layout, currentTransStage, setCurrentTransStage } = props;

  const navigate = useNavigate();
  const { DEVICE_HEIGHT } = useDeviceDimensions();

  const [ menuIsVisible, setMenuVisible ] = useState(false);
  const NAV_HEIGHT = 40;

  const mLogo = useMotionValue(0);
  const aTransY = useTransform(mLogo, [ 0, 1 ], [ DEVICE_HEIGHT / 2 - NAV_HEIGHT, 0 ]);
  const aScale = useTransform(mLogo, [ 0, 1 ], [ 2, 1 ]);

  const mMenu = useMotionValue(0);
  const aMenuOpacity = useTransform(mMenu, [ 0, 1 ], [ 0, 1 ]);
  const aMenuScale = useTransform(mMenu, [ 0, 1 ], [ 0.0001, 1 ]);

  const mMenuItem = useMotionValue(0);
  const aMenuItemOpacity = useTransform(mMenuItem, [ 0, 1 ], [ 0, 1 ]);
  const aMenuItemX1 = useTransform(mMenuItem, [ 0, 1 ], [ -40, 0 ]);
  const aMenuItemX2 = useTransform(mMenuItem, [ 0, 1 ], [ -80, 0 ]);
  const aMenuItemX3 = useTransform(mMenuItem, [ 0, 1 ], [ -120, 0 ]);

  const isLanding = layout === 'LANDING';
  //  const isAvatars = layout === 'AVATARS';
  const isDetail = layout === 'DETAIL';

  useEffect(() => {
    if (currentTransStage === 1) {
      const animation = animate(mLogo, 1, {
        duration: 1.2,
        ease: 'easeOut',
        onComplete: () => {
          setCurrentTransStage(2);
        }
      });

      return () => animation.stop();
    }
  }, [ currentTransStage ]);

  useEffect(() => {
    const animation = menuIsVisible
      ? animate(mMenu, 1, {
        duration: 0.5,
        ease: menuIsVisible ? 'easeOut' : 'easeIn',
        onComplete: () => {
          animate(mMenuItem, 1, {
            duration: 0.5,
            ease: 'easeOut'
          });
        }
      })
      : animate(mMenuItem, 0, {
        duration: 0.4,
        ease: 'easeIn',
        onComplete: () => {
          animate(mMenu, 0, {
            duration: 0.4,
            ease: menuIsVisible ? 'easeOut' : 'easeIn'
          });
        }
      });

    return () => animation.stop();
  }, [ menuIsVisible ]);

  const goToPage = (path) => (event) => {
    event.preventDefault();
    navigate(path);
  };

  const toggleMenu = () => () => {
    setMenuVisible((prevState) => !prevState);
  };

  return (
    <nav className={`navigation__c page-pad-h flex-center-v ${className} `}>
      <motion.div
        className={`navigation__burger flex-center`}
        initial={isLanding && { opacity: 0 }}
        animate={currentTransStage === 2 && { opacity: 1 }}
        transition={{ ease: 'linear', duration: 1.2 }}
      >
        <Icon
          className={`menu-open ${menuIsVisible && ''}`}
          icon='menu'
          animate={{
            transform: `rotateX(${menuIsVisible ? '90deg' : '0'}) rotateY(${
              menuIsVisible ? '90deg' : '0'
            })`
          }}
          transition={{ ease: 'linear', duration: 0.5 }}
          onClick={toggleMenu()}
        />

        <Icon
          className={`menu-close ${menuIsVisible && ''}`}
          icon='star-wars-x-mark'
          animate={{
            transform: `rotateX(${!menuIsVisible ? '-90deg' : '0'}) rotateZ(${
              !menuIsVisible ? '-90deg' : '0'
            }) scale(1.5)`
          }}
          transition={{ ease: 'linear', duration: 0.5 }}
          onClick={toggleMenu()}
        />
      </motion.div>

      <motion.ul
        className={`navigation__menu flex-col flex-center ${menuIsVisible && 'visible'}`}
        style={{
          zIndex: menuIsVisible && 100,
          opacity: aMenuOpacity,
          scale: aMenuScale,
          x: '-50%',
          y: '-20%'
        }}
      >
        <Layer className={`navigation__menu-layer`} />

        <motion.li
          className={`navigation__menu-item card-detail__details-title-button flex-center`}
          onClick={goToPage('/')}
          style={{ opacity: aMenuItemOpacity, x: aMenuItemX1 }}
        >
          <Shape className={`polygon`} />
          <span className={`navigation__menu-item__label flex-center btn-text-lg`}>Home</span>
        </motion.li>
        <motion.li
          className={`navigation__menu-item card-detail__details-title-button flex-center`}
          onClick={goToPage('/avatars')}
          style={{ opacity: aMenuItemOpacity, x: aMenuItemX2 }}
        >
          <Shape className={`polygon`} />
          <span className={`navigation__menu-item__label flex-center btn-text-lg`}>Avatars</span>
        </motion.li>
        <motion.li
          className={`navigation__menu-item card-detail__details-title-button flex-center`}
          onClick={goToPage('/')}
          style={{ opacity: aMenuItemOpacity, x: aMenuItemX3 }}
        >
          <Shape className={`polygon`} />
          <span className={`navigation__menu-item__label flex-center btn-text-lg`}>About</span>
        </motion.li>
      </motion.ul>

      <Icon
        icon='logo'
        className={``}
        style={isLanding && { translateY: aTransY, scale: aScale }}
        onClick={goToPage('/')}
      />

      <Icon
        icon='darth-vader'
        style={{ opacity: isDetail ? 1 : 0 }}
        onClick={goToPage('/avatars')}
      />
    </nav>
  );
};

export default Navigation;
