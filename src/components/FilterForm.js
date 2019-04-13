import React, { Component } from 'react';
import ZipCodeSelect from './ZipCodeSelect';

class FilterForm extends Component {
  render() {
    const { data, onZipCodeChange, zipCode } = this.props;
    console.log(data[0]);

    return (
      <form>
        <label
          htmlFor="zip"
          className="mr-1"
        >Zip code:</label>
        <ZipCodeSelect
          onChange={onZipCodeChange}
          selectedZipCode={zipCode}
          allZipCodes={data.map(row => row.zip)}
        />
      </form>
    );
  }
}

export default FilterForm;
