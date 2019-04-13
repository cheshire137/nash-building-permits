import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './PermitMap.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const hasCoordinates = function(buildingPermit) {
  return buildingPermit.position;
};

const getCenterPosition = function(buildingPermits) {
  let lat = 0;
  let lng = 0;

  for (const buildingPermit of buildingPermits) {
    lng = lng + buildingPermit.longitude;
    lat = lat + buildingPermit.latitude;
  }

  lat = lat / buildingPermits.length;
  lng = lng / buildingPermits.length;

  return [lat, lng];
};

class PermitMap extends Component {
  render() {
    const { buildingPermits } = this.props;
    const geocodedPermits = buildingPermits.filter(hasCoordinates);

    if (geocodedPermits.length < 1) {
      return (
        <p>No building permits in the selected area.</p>
      );
    }

    const center = getCenterPosition(geocodedPermits);

    return (
      <div className="map">
        <Map
          id="permit-map"
          center={center}
          className="map__reactleaflet"
          zoom="13"
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {geocodedPermits.map(buildingPermit => (
            <Marker
              key={buildingPermit.key}
              position={buildingPermit.position}
            >
              <Popup>
                {buildingPermit.purpose}
              </Popup>
            </Marker>
          ))}
        </Map>
      </div>
    );
  }
}

export default PermitMap;
