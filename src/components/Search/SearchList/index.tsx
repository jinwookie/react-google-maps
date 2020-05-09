import React, { FC } from 'react';
import './styles.scss';

interface ISearchListProps {
  places: any[];
  onSelect?: (place: any, index: number) => void;
}

const SearchList: FC<ISearchListProps> = ({ places, onSelect }) => {
  return (
    <ul className="search-page__search-list">
      {
        places.map((place, index) => (
          <li key={place.id} className="search-page__search-list__item">
            <button onClick={() => onSelect && onSelect(place, index)}>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </button>
          </li>
        ))
      }
    </ul>
  )
};

export default SearchList;
