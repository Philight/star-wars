import CardsList from '@components/card/CardsList';

const AvatarsPage = (props) => {
  let { className, searchValue } = props;

  return (
    <div className={`avatars-page__c page page-pad-h flex-col ${className}`}>
      <h1 className={`avatars-page__heading btn-text-lg`}>Avatars</h1>
      <CardsList searchValue={searchValue} />
    </div>
  );
};

export default AvatarsPage;
