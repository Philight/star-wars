import { useNavigate } from 'react-router-dom';
import CardDetail from '@components/card/CardDetail';
import Icon from '@components/graphic/Icon';

const DetailPage = (props) => {
  let { className } = props;
  const navigate = useNavigate();

  const goToAvatars = (e) => {
    e.preventDefault();
    navigate(`/avatars`);
  };

  return (
    <div className={`detail-page__c page ${className} page-pad`}>
      <a className={`detail-page__back-arrow flex-center-v btn-text-sm`} onClick={goToAvatars}>
        <Icon icon='arrows' />
        BACK
      </a>
      <CardDetail />
    </div>
  );
};

export default DetailPage;
