import React, { Component } from 'react';
import ZipCodeSelect from './ZipCodeSelect';

class FilterForm extends Component {
  render() {
    const { buildingPermits, onZipCodeChange, zipCode } = this.props;
    console.log(buildingPermits[0]);
    const allZipCodes = buildingPermits.map(buildingPermit => buildingPermit.zipCode);

    return (
      <form
        className="mb-4"
      >
        <label
          htmlFor="zip"
          className="mr-1"
        >Zip code:</label>
        <ZipCodeSelect
          onChange={onZipCodeChange}
          selectedZipCode={zipCode}
          allZipCodes={allZipCodes}
        />
      </form>
    );
  }
}

export default FilterForm;
