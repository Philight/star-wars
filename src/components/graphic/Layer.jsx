import { motion } from 'framer-motion';

const Layer = (props) => {
  let { className, style } = props;

  return (
    <motion.canvas
      className={`layer__c absolute-center fill-parent ${className}`}
      style={{ ...style }}
    />
  );
};

export default Layer;
