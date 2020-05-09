import React, { useState } from 'react';
import SearchMap from '../../components/Search/SearchMap';
import SearchList from '../../components/Search/SearchList';
import places from '../../fixtures/places.json';

import './styles.scss';

const SearchPage = () => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [currentMarker, setCurrentMarker] = useState();

  const onSelectPlace = (place, index) => {
    setShowInfo(true);
    setCurrentMarker(place);
  };

  const onClose = () => {
    setShowInfo(false);
    setCurrentMarker(undefined);
  };

  return (
    <div className="search-page">
      <h1>Search</h1>
      <div className="search-page__container">
        <SearchList places={places} onSelect={onSelectPlace} />
        <SearchMap
          places={places}
          currentMarker={currentMarker}
          showInfo={showInfo}
          onSelect={onSelectPlace}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default SearchPage;
