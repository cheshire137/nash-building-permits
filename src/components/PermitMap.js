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

const getCenterPosition = function(data) {
  let lat = 0;
  let lng = 0;
  let count = 0;

  for (const row of data) {
    if (row.mapped_location && row.mapped_location.coordinates) {
      lat = lat + row.mapped_location.coordinates[1];
      lng = lng + row.mapped_location.coordinates[0];
      count++;
    }
  }

  lat = lat / count;
  lng = lng / count;

  return [lat, lng];
};

class PermitMap extends Component {
  render() {
    const { data } = this.props;
    if (data.length < 1) {
      return <p>No building permits in the selected area.</p>;
    }

    const position = getCenterPosition(data);
    if (position[0] === 0 && position[1] === 0) {
      return null;
    }

    return (
      <div className="map">
        <Map
          id="permit-map"
          center={position}
          className="map__reactleaflet"
          zoom="13"
        >
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default PermitMap;
