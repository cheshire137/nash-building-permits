import React, { Component } from 'react';
import BuildingPermitsIssuedApi from './models/BuildingPermitsIssuedApi';
import Config from './config.json';
import FilterForm from './components/FilterForm';
import PermitMap from './components/PermitMap';
import LocalStorage from './models/LocalStorage';
import './App.css';

const zipCodeKey = 'zip-code';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildingPermits: [],
      isLoading: true,
      zipCode: LocalStorage.get(zipCodeKey) || '',
      filteredBuildingPermits: []
    };
  }

  componentDidMount() {
    const api = new BuildingPermitsIssuedApi(Config.socrataApi.appToken);
    api.getBuildingPermits().then(this.onDataLoaded);
  }

  onDataLoaded = buildingPermits => {
    this.setState(prevState => ({
      buildingPermits,
      isLoading: false,
      filteredBuildingPermits: this.filterBuildingPermits(buildingPermits, prevState.zipCode)
    }));
  };

  filterBuildingPermits = (buildingPermits, zipCode) => {
    return buildingPermits.filter(buildingPermit =>
      buildingPermit.zipCode === zipCode);
  };

  onZipCodeChange = zipCode => {
    LocalStorage.set(zipCodeKey, zipCode);
    this.setState(prevState => ({
      zipCode,
      filteredBuildingPermits: this.filterBuildingPermits(prevState.buildingPermits, zipCode)
    }));
  };

  render() {
    const { buildingPermits, isLoading, zipCode, filteredBuildingPermits } = this.state;

    return (
      <div>
        <header>
          <div className="container my-3">
            <h1
              className="f3 text-normal"
            >Nashville Building Permits</h1>
          </div>
        </header>
        <main>
          <div className="container">
            {isLoading ? (
              <div className="blankslate">
                <h2>Loading...</h2>
              </div>
            ) : (
              <div>
                <FilterForm
                  buildingPermits={buildingPermits}
                  zipCode={zipCode}
                  onZipCodeChange={this.onZipCodeChange}
                />
                <PermitMap
                  buildingPermits={filteredBuildingPermits}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
