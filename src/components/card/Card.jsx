import { motion } from 'framer-motion';

import Shape from '@components/graphic/Shape';
import Layer from '@components/graphic/Layer';
import { CONSTANTS } from '@data/CONSTANTS.js';

const Card = (props) => {
  let { className, data, onClick } = props;

  let dataId = data.url.split('/people/')[1].split('/')[0];

  return (
    <motion.div
      className={`
			card__c ${className} flex-col flex-center
		`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      <figure className={`card__image-wrapper`}>
        <img
          className={`card__image`}
          src={CONSTANTS.CDN_IMAGE_URL_CHARACTER.replace('$id', dataId)}
          alt='alt'
        />
        <Layer />
      </figure>

      <div className={`card__description flex-center`}>
        <Shape className={`polygon`} />
        <h3 className={`card__title flex-center h3`}>{data.name}</h3>
      </div>
      <h3 className={`card__help-text flex-center help-text`}>{data.name}</h3>
    </motion.div>
  );
};

export default Card;
