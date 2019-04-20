import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './PermitList.css';

const formatLongText = ({ value }) => {
  return (
    <div
      className="ws-normal constrained-text"
    >{value}</div>
  );
};

const centerText = ({ value }) => {
  return <div className="text-center">{value}</div>
};

class PermitList extends Component {
  render() {
    const { buildingPermits } = this.props;
    const geocodedPermits = buildingPermits.filter(permit => permit.hasCoordinates());

    if (geocodedPermits.length < 1) {
      return null;
    }

    return (
      <ReactTable
        data={geocodedPermits}
        columns={[
          {
            Header: 'Address',
            accessor: 'address',
            minWidth: 130
          },
          {
            Header: 'Zip code',
            accessor: 'zipCode',
            Cell: centerText
          },
          {
            Header: 'Type',
            accessor: 'type',
            Cell: centerText
          },
          {
            Header: 'Sub-type',
            accessor: 'subtype',
            Cell: formatLongText,
            minWidth: 170
          },
          {
            Header: 'Council district',
            accessor: 'councilDistrict',
            Cell: centerText
          }
        ]}
        defaultPageSize={3}
        className="-striped -highlight permit-list"
      />
    );
  }
}

export default PermitList;
