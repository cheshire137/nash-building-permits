import React, { Component } from 'react';

class PermitMap extends Component {
  render() {
    const { data } = this.props;

    return (
      <div>
        map {data.length}
      </div>
    );
  }
}

export default PermitMap;
