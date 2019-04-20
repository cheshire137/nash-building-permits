import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './PermitList.css';

const formatDateCell = ({ value }) => {
  if (value instanceof Date) {
    const year = value.getFullYear();
    let month = value.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = value.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return <div className="text-center">{`${year}-${month}-${day}`}</div>;
  }

  return <div className="text-center">{value}</div>;
};

const formatLongText = ({ value }) => {
  return (
    <div
      title={value}
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
            headerClassName: 'text-bold',
            minWidth: 130
          },
          {
            Header: 'Zip code',
            accessor: 'zipCode',
            headerClassName: 'text-bold',
            Cell: centerText
          },
          {
            Header: 'Type',
            accessor: 'type',
            minWidth: 130,
            headerClassName: 'text-bold',
            Cell: centerText
          },
          {
            Header: 'Sub-type',
            accessor: 'subtype',
            headerClassName: 'text-bold',
            Cell: formatLongText,
            minWidth: 170
          },
          {
            Header: 'Council district',
            headerClassName: 'text-bold',
            accessor: 'councilDistrict',
            Cell: centerText
          },
          {
            Header: 'Date issued',
            headerClassName: 'text-bold',
            accessor: 'dateIssued',
            minWidth: 80,
            Cell: formatDateCell
          }
        ]}
        pageSize={3}
        showPageSizeOptions={false}
        className="-striped -highlight permit-list"
      />
    );
  }
}

export default PermitList;
