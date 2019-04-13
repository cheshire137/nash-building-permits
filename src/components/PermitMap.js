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

class PermitMap extends Component {
  render() {
    const { data } = this.props;
    const firstRow = data[0];
    if (!firstRow) {
      return null;
    }
    if (!firstRow.mapped_location || !firstRow.mapped_location.coordinates) {
      return null;
    }

    const position = firstRow.mapped_location.coordinates.reverse();

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
