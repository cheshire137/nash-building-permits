import React, { Component } from 'react';
import Util from '../models/Util';

class TypeSelect extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { allTypes, selectedType } = this.props;
    const types = Util.uniq(allTypes.sort());

    return (
      <div>
        <label
          htmlFor="type"
          className="mr-1"
        >Permit type:</label>
        <select
          id="type"
          className="form-select"
          onChange={this.onChange}
          value={selectedType}
        >
          <option value="all">All</option>
          {types.map(zipCode => (
            <option value={zipCode} key={zipCode}>{zipCode}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default TypeSelect;
