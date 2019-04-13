import React, { Component } from 'react';
import Util from '../models/Util';

const categorySeparator = ' - ';

const displayName = function(type, allTypes) {
  const count = allTypes.filter(otherType => otherType === type).length;
  if (type.indexOf(categorySeparator) < 0) {
    return `${type} (${count})`;
  }
  const subcategory = type.split(categorySeparator)[1];
  return `${subcategory} (${count})`;
};

const getCategories = function(types) {
  let categories = [];

  for (const type of types) {
    if (type.indexOf(categorySeparator) > -1) {
      const category = type.split(categorySeparator)[0];
      categories.push(category);
    }
  }

  categories = Util.uniq(categories.sort());

  if (categories.length < types.length) {
    categories.push('Other');
  }

  return categories;
};

const getTypesForCategory = function(types, category) {
  return types.filter(type => {
    if (type.indexOf(categorySeparator) < 0) {
      return category === 'Other';
    }
    return type.indexOf(category) === 0
  });
};

const getTypesByCategory = function(types, categories) {
  const result = {};
  for (const category of categories) {
    result[category] = getTypesForCategory(types, category);
  }
  return result;
};

class TypeSelect extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { allTypes, selectedType } = this.props;
    const types = Util.uniq(allTypes.sort());
    const categories = getCategories(types);
    const typesByCategory = getTypesByCategory(types, categories);

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
          {categories.map(category => (
            <optgroup label={category} key={category}>
              {typesByCategory[category].map(type => (
                <option value={type} key={type}>{displayName(type, allTypes)}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    );
  }
}

export default TypeSelect;
