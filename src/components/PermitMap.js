import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import './PermitMap.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const hasCoordinates = function(permit) {
  return permit.position();
};

const getCenterPosition = function(buildingPermits) {
  let lat = 0;
  let lng = 0;

  for (const permit of buildingPermits) {
    lng = lng + permit.longitude;
    lat = lat + permit.latitude;
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
    let bounds = geocodedPermits.map(permit => permit.position());
    let zoom = null;
    if (bounds.length < 2) {
      bounds = null;
      zoom = 13;
    }

    return (
      <Map
        id="permit-map"
        center={center}
        className="map__reactleaflet"
        bounds={bounds}
        zoom={zoom}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geocodedPermits.map(permit => (
          <Marker
            key={permit.key()}
            position={permit.position()}
            icon={L.AwesomeMarkers.icon({
              icon: permit.icon(),
              markerColor: permit.markerColor(),
              prefix: 'ion'
            })}
          >
            <Popup>{permit.purpose}</Popup>
            <Tooltip>{permit.subtype}</Tooltip>
          </Marker>
        ))}
      </Map>
    );
  }
}

export default PermitMap;
