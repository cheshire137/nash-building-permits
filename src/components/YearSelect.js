import React, { Component } from 'react';
import Util from '../models/Util';

const displayName = function(year, allYears) {
  const count = allYears.filter(otherYear => otherYear.toString() === year.toString()).length;
  return `${year} (${count})`;
};

class YearSelect extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { allYears, selectedYear } = this.props;
    const years = Util.uniq(allYears.sort()).reverse();

    return (
      <div>
        <label
          htmlFor="year"
          className="mr-1"
        >Year issued:</label>
        <select
          id="year"
          className="form-select"
          onChange={this.onChange}
          value={selectedYear}
        >
          <option value="all">All</option>
          {years.map(year => (
            <option value={year} key={year}>{displayName(year, allYears)}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default YearSelect;
