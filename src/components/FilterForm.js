import React, { Component } from 'react';
import ZipCodeSelect from './ZipCodeSelect';
import TypeSelect from './TypeSelect';

class FilterForm extends Component {
  render() {
    const { buildingPermits, onZipCodeChange, zipCode,
            onTypeChange, type } = this.props;
    const allZipCodes = buildingPermits.map(permit => permit.zipCode);
    const allTypes = buildingPermits.filter(permit => permit.matchesZipCode(zipCode))
                                    .map(permit => permit.type);

    return (
      <form
        className="flex-auto flex-justify-end d-flex flex-items-center"
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
