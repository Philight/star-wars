import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const Shape = forwardRef((props, ref) => {
  let { className, style, children, width, height, left, bottom, onClick } = props;

  return (
    <motion.canvas
      className={`shape__c ${className}`}
      style={{
        width: width,
        height: height,
        marginLeft: left,
        marginBottom: bottom,
        ...style
      }}
      ref={ref}
      onClick={onClick}
    >
      {children}
    </motion.canvas>
  );
});

export default Shape;
