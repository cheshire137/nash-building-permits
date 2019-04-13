import React, { Component } from 'react';
import ZipCodeSelect from './ZipCodeSelect';
import TypeSelect from './TypeSelect';
import YearSelect from './YearSelect';

class FilterForm extends Component {
  render() {
    const { buildingPermits, onZipCodeChange, zipCode,
            onTypeChange, type, onYearChange, year } = this.props;
    const allZipCodes = buildingPermits.map(permit => permit.zipCode);

    const permitsInZip = buildingPermits.filter(permit => permit.matchesZipCode(zipCode));
    const allTypes = permitsInZip.map(permit => permit.type);

    const permitsInType = permitsInZip.filter(permit => permit.matchesType(type));
    const allYears = permitsInType.map(permit => permit.year());

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
        <YearSelect
          onChange={onYearChange}
          selectedYear={year}
          allYears={allYears}
        />
      </form>
    );
  }
}

export default FilterForm;
