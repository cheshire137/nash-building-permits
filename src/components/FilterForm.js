import React, { Component } from 'react';
import ZipCodeSelect from './ZipCodeSelect';
import TypeSelect from './TypeSelect';

class FilterForm extends Component {
  render() {
    const { buildingPermits, onZipCodeChange, zipCode,
            onTypeChange, type } = this.props;
    console.log(buildingPermits[0]);
    const allZipCodes = buildingPermits.map(permit => permit.zipCode);
    const allTypes = buildingPermits.map(permit => permit.type);

    return (
      <form
        className="mb-4 d-flex flex-items-center"
      >
        <ZipCodeSelect
          onChange={onZipCodeChange}
          selectedZipCode={zipCode}
          allZipCodes={allZipCodes}
        />
        <TypeSelect
          onChange={onTypeChange}
          selectedType={type}
          allTypes={allTypes}
        />
      </form>
    );
  }
}

export default FilterForm;
