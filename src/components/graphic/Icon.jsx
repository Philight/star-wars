import { forwardRef } from 'react';
import { motion } from 'framer-motion';

import Arrows from '@icons/arrows.svg';
import ChevronLeft from '@icons/chevron-left.svg';
import DarthVader from '@icons/darth-vader.svg';
import Filter from '@icons/filter.svg';
import Logo from '@icons/logo.svg';
import Menu from '@icons/menu.svg';
import Search1 from '@icons/search-1.svg';
import Search2 from '@icons/search-2.svg';
import Search3 from '@icons/search-3.svg';
import StarWarsXMark from '@icons/star-wars-x-mark.svg';

const Icon = forwardRef((props, ref) => {
  let {
    icon,
    width,
    height,
    color,
    className,
    style,
    onClick,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    initial,
    animate,
    transition
  } = props;

  const iconName = icon.toLowerCase();
  const getIcon = () => {
    switch (iconName) {
    case 'menu':
      return Menu;
    case 'logo':
      return Logo;
    case 'search-1':
      return Search1;
    case 'search-2':
      return Search2;
    case 'search-3':
      return Search3;

    case 'arrows':
      return Arrows;
    case 'darth-vader':
      return DarthVader;
    case 'star-wars-x-mark':
      return StarWarsXMark;
    case 'chevron-left':
      return ChevronLeft;
    case 'filter':
      return Filter;

    default:
      return '';
    }
  };

  const isMultiColor = () => {
    switch (iconName) {
    case 'logo':
    case 'coffee-2':
      return true;

    default:
      return false;
    }
  };

  const renderingStyle = isMultiColor()
    ? {
      src: getIcon()
    }
    : {
      // 1x1 pixel PNG uri
      src: `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=`,
      style: {
        backgroundColor: color,
        backgroundImage: `url(${getIcon()}) no-repeat center`,
        WebkitMask: `url(${getIcon()}) no-repeat center`,
        mask: `url(${getIcon()}) no-repeat center`
      }
    };

  return (
    <motion.figure
      className={`icon__c icon-${iconName} flex-center ${className}`}
      style={{ width: width, height: height, ...style }}
      ref={ref}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <img className='icon fill-parent' alt={`icon: ${icon}`} {...renderingStyle} />
    </motion.figure>
  );
});

export default Icon;
