import React, { Component } from 'react';
import BuildingPermitsIssuedApi from './models/BuildingPermitsIssuedApi';
import Config from './config.json';
import FilterForm from './components/FilterForm';
import PermitMap from './components/PermitMap';
import LocalStorage from './models/LocalStorage';
import './App.css';

const zipCodeKey = 'zip-code';
const typeKey = 'type';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      buildingPermits: [],
      filteredBuildingPermits: [],
    };
  }

  componentDidMount() {
    const api = new BuildingPermitsIssuedApi(Config.socrataApi.appToken);
    api.getBuildingPermits().then(this.onDataLoaded);
  }

  onDataLoaded = buildingPermits => {
    const zipCodes = buildingPermits.filter(permit => permit.zipCode).map(permit => permit.zipCode).sort();
    let firstZipCode = null;
    if (zipCodes.length > 0) {
      firstZipCode = zipCodes[0];
    }
    this.setState(prevState => {
      const zipCode = LocalStorage.get(zipCodeKey) || prevState.zipCode || firstZipCode;
      const type = LocalStorage.get(typeKey) || prevState.type || 'all';

      return {
        buildingPermits,
        isLoading: false,
        zipCode,
        type,
        filteredBuildingPermits: this.filterBuildingPermits(buildingPermits, { zipCode, type })
      }
    });
  };

  filterBuildingPermits = (buildingPermits, criteria) => {
    return buildingPermits.filter(permit => permit.matches(criteria));
  };

  onZipCodeChange = zipCode => {
    LocalStorage.set(zipCodeKey, zipCode);
    this.setState(prevState => ({
      zipCode,
      type: 'all',
      filteredBuildingPermits: this.filterBuildingPermits(
        prevState.buildingPermits,
        { zipCode, type: 'all' }
      )
    }));
  };

  onTypeChange = type => {
    LocalStorage.set(typeKey, type);
    this.setState(prevState => ({
      type,
      filteredBuildingPermits: this.filterBuildingPermits(
        prevState.buildingPermits,
        { zipCode: prevState.zipCode, type }
      )
    }));
  };

  render() {
    const { buildingPermits, isLoading, zipCode, type,
            filteredBuildingPermits } = this.state;

    return (
      <div>
        <header className="site-header">
          <div className="container py-3 d-flex flex-items-center flex-justify-between">
            <h1
              className="f3 text-normal"
            >Nashville Building Permits</h1>
            {isLoading ? null : (
              <FilterForm
                buildingPermits={buildingPermits}
                zipCode={zipCode}
                type={type}
                onZipCodeChange={this.onZipCodeChange}
                onTypeChange={this.onTypeChange}
              />
            )}
          </div>
        </header>
        <main className="site-main">
          <div className="container">
            {isLoading ? (
              <div className="blankslate">
                <h2>Loading...</h2>
              </div>
            ) : (
              <PermitMap
                buildingPermits={filteredBuildingPermits}
              />
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
