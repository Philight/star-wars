import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import { DataContext } from '@contexts/DataProvider';
import Card from '@components/card/Card';
import CardsPagination from '@components/card/CardsPagination';
import Filter from '@components/util/Filter';

import { getPageMaxPosts } from '@data';
import { createArrayGroups } from '@utils/createArrayGroups.js';
import useDeviceDimensions from '@utils/useDeviceDimensions.js';

const CardsList = (props) => {
  let { className, searchValue } = props;

  const navigate = useNavigate();
  const { DEVICE_TYPE } = useDeviceDimensions();
  const context = useContext(DataContext);
  const DATA_AVATARS = context.data.people;

  const [ filteredData, setFilteredData ] = useState(DATA_AVATARS); // [ [], [], [] ]
  const [ currentPage, setCurrentPage ] = useState(1);

  const COUNT_PER_PAGE = getPageMaxPosts(DEVICE_TYPE);

  const COLUMNS = [
    { name: 'height', type: 'range' },
    { name: 'mass', type: 'range' },
    /*
    { name: 'hair_color', type: 'select' },
    { name: 'skin_color', type: 'select' },
    { name: 'eye_color', type: 'select' },
    { name: 'gender', type: 'radio' },
    { name: 'homeworld', type: 'radio' },
    { name: 'films', type: 'select' },
*/
    { name: 'vehicles', type: 'select' }
  ];

  useEffect(() => {
    setCurrentPage(1);
  }, [ searchValue ]);

  const goToDetails = (cardUrl) => () => {
    const cardId = cardUrl.split('/people/')[1].split('/')[0];
    navigate(`/detail/character/${cardId}`);
  };

  const filterData = (data) => {
    return data?.filter((elem) => {
      return elem.name?.toLowerCase().includes(searchValue?.toLowerCase() ?? '');
    });
  };

  return (
    <div
      className={`
			cards-list__c ${className} flex-col 
		`}
    >
      <Filter
        className={`cards-list__filter`}
        columns={COLUMNS}
        data={DATA_AVATARS}
        updateFilteredData={setFilteredData}
      />

      <div className={`cards-list__cards-container carousel-view`}>
        <div className={`cards-list__cards-wrapper carousel-slider`}>
          {createArrayGroups(COUNT_PER_PAGE, filterData(filteredData)).map(
            (cardsGroup, pageIndex) => {
              return (
                <div
                  key={`cards-group-${pageIndex}`}
                  className={`cards-list__cards-group carousel-group flex-center-v flex-grid col-2`}
                  style={{ transform: `translateX(-${(currentPage - 1) * 100}%)` }}
                  data-pagination={pageIndex + 1}
                >
                  <AnimatePresence>
                    {cardsGroup.map((cardData) => (
                      <Card
                        key={`char-id-${cardData.url}`}
                        className={`flex-item`}
                        data={cardData}
                        onClick={goToDetails(cardData.url)}
                        initial={{ opacity: 0, y: 200 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              );
            }
          )}
        </div>
      </div>

      <CardsPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cardsArrLength={Math.round(filteredData.length / COUNT_PER_PAGE)}
      />
    </div>
  );
};

export default CardsList;
