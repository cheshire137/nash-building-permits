import React, { Component } from 'react';

const uniq = function(list) {
  const hash = {};
  for (const item of list) {
    hash[item] = 1;
  }
  return Object.keys(hash);
};

class ZipCodeSelect extends Component {
  onChange = event => {
    const zipCode = event.target.value;
    this.props.onChange(zipCode);
  };

  render() {
    const { allZipCodes, selectedZipCode } = this.props;
    const zipCodes = uniq(allZipCodes.sort());

    return (
      <select
        id="zip"
        className="form-select"
        onChange={this.onChange}
        value={selectedZipCode}
      >
        {zipCodes.map(zipCode => (
          <option value={zipCode} key={zipCode}>{zipCode}</option>
        ))}
      </select>
    );
  }
}

export default ZipCodeSelect;
