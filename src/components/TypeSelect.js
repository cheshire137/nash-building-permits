import React, { Component } from 'react';
import Util from '../models/Util';

const categorySeparator = ' - ';

const displayName = function(type) {
  if (type.indexOf(categorySeparator) < 0) {
    return type;
  }
  return type.split(categorySeparator)[1];
};

const getCategories = function(types) {
  let categories = [];
  let subcategories = [];

  for (const type of types) {
    if (type.indexOf(categorySeparator) > -1) {
      const [ category, subcategory ] = type.split(categorySeparator);
      categories.push(category);
      subcategories.push(subcategory);
    }
  }

  categories = Util.uniq(categories.sort());
  subcategories = Util.uniq(subcategories.sort());

  if (categories.length < types.length) {
    categories.push('Other');
  }

  return { categories, subcategories };
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
    const { categories, subcategories } = getCategories(types);
    const typesByCategory = getTypesByCategory(types, categories);
    console.log(typesByCategory)

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
                <option value={type} key={type}>{displayName(type)}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
    );
  }
}

export default TypeSelect;
