import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import Shape from '@components/graphic/Shape';

const INTRO_TEXT = `May The Force Be With You`;
const BUTTON_TEXT = `ENTER`;

const FADE_ANIM = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1
  },
  transition: {
    ease: 'linear',
    duration: 1.2
  }
};

const LandingPage = (props) => {
  let { className, currentTransStage } = props;
  const navigate = useNavigate();

  const goToAvatars = (e) => {
    e.preventDefault();
    navigate(`/avatars`);
  };

  return (
    <div
      className={`landing-page__c page flex-col flex-center fill-parent ${className} ${
        currentTransStage < 2 && 'hidden'
      }`}
    >
      <motion.h3
        className={`landing-page__text body-text`}
        initial={FADE_ANIM.initial}
        animate={currentTransStage === 2 && FADE_ANIM.animate}
        transition={FADE_ANIM.transition}
      >
        {INTRO_TEXT}
      </motion.h3>
      <motion.h4
        className={`landing-page__text help-text`}
        initial={FADE_ANIM.initial}
        animate={currentTransStage === 2 && FADE_ANIM.animate}
        transition={FADE_ANIM.transition}
      >
        {INTRO_TEXT}
      </motion.h4>

      <motion.a
        className={`landing-page__button flex-center btn-text-sm`}
        href='#!'
        role='button'
        onClick={goToAvatars}
        initial={FADE_ANIM.initial}
        animate={currentTransStage === 3 && FADE_ANIM.animate}
        transition={FADE_ANIM.transition}
      >
        <Shape className={`polygon`} />
        {BUTTON_TEXT}
      </motion.a>
    </div>
  );
};

export default LandingPage;
