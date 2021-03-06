import React, { Component } from 'react';
import Util from '../models/Util';

class ZipCodeSelect extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { allZipCodes, selectedZipCode } = this.props;
    const zipCodes = Util.uniq(allZipCodes.sort());

    return (
      <div>
        <label
          htmlFor="zip"
          className="mr-1"
        >Zip code:</label>
        <select
          id="zip"
          className="form-select mr-4"
          onChange={this.onChange}
          value={selectedZipCode}
        >
          <option value="all">All</option>
          {zipCodes.map(zipCode => (
            <option value={zipCode} key={zipCode}>{zipCode}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default ZipCodeSelect;
