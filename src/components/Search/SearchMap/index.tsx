import React, { FC } from 'react';
import {
  GoogleApiWrapper,
  Map,
  Marker,
  InfoWindow
} from 'google-maps-react';

interface ISearchMapProps {
  google: any;
  places: any[];
  currentMarker?: any;
  showInfo?: boolean;
  onSelect?: (place: any, index?: number) => void;
  onClose?: () => void;
}

const SearchMap: FC<ISearchMapProps> = ({
  google,
  places,
  currentMarker,
  showInfo,
  onSelect,
  onClose,
}) => {
  const style = {
    width: '100%',
    height: '100%'
  }

  const onMarkerMouseOver = (props, marker, e) => {
    onSelect && onSelect(marker);
  };

  return (
    <div className="search-page__map">
      <Map
          google={google}
          style={style}
          initialCenter={{
            lat: 37.778519,
            lng: -122.405640
          }}
          zoom={13}
        >
          {
            places.map((marker, index) => (
              <Marker
                key={marker.id}
                name={marker.name}
                position={marker.position}
                onClick={onMarkerMouseOver}
              />
            ))
          }
          <InfoWindow
            position={currentMarker?.position}
            visible={showInfo}
            onClose={onClose}
            >
              <div className="search-map__infowindow">
                <h3>{currentMarker?.name}</h3>
              </div>
          </InfoWindow>
        </Map>
    </div>
  )
};

export default GoogleApiWrapper({
  apiKey: process.env.GOOGLE_MAPS_EMBED_API_KEY,
  version: '3.40',
})(SearchMap);
