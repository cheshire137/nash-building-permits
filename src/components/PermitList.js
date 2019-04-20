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
      <div className="permit-list pt-2">
        <table className="width-full text-center">
          <thead>
            <tr>
              <th
                className="pb-2"
              >Address</th>
              <th
                className="pb-2 no-wrap"
              >Zip code</th>
              <th
                className="pb-2"
              >Type</th>
              <th
                className="pb-2 no-wrap"
              >Sub-type</th>
              <th
                className="pb-2 no-wrap"
              >Council district</th>
            </tr>
          </thead>
          <tbody>
            {geocodedPermits.map(permit => (
              <tr key={permit.key()}>
                <td
                  className="border-top"
                >{permit.address}</td>
                <td
                  className="border-top"
                >{permit.zipCode}</td>
                <td
                  className="border-top no-wrap"
                >{permit.type}</td>
                <td
                  className="border-top"
                >{permit.subtype}</td>
                <td
                  className="border-top"
                >{permit.councilDistrict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PermitList;
