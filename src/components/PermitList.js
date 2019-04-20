import React, { Component } from 'react';
import './PermitList.css';

class PermitList extends Component {
  render() {
    const { buildingPermits } = this.props;
    const geocodedPermits = buildingPermits.filter(permit => permit.hasCoordinates());

    if (geocodedPermits.length < 1) {
      return null;
    }

    return (
      <ul className="permit-list pt-2">
        {geocodedPermits.map(permit => (
          <li key={permit.key()}>
            {permit.type}
          </li>
        ))}
      </ul>
    );
  }
}

export default PermitList;
