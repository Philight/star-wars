const Background = (props) => {
  let { className, source, withOverlay } = props;

  return (
    <figure className={`background__c absolute-center fill-parent ${className}`}>
      {!!source && <img src={source} className='background__picture' />}
      {!!withOverlay && <canvas className='background__overlay absolute-center fill-parent' />}
    </figure>
  );
};

export default Background;
