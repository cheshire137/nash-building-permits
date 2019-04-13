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
      buildingPermits: [],
      isLoading: true,
      zipCode: LocalStorage.get(zipCodeKey) || 'all',
      filteredBuildingPermits: [],
      type: LocalStorage.get(typeKey) || 'all'
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
      filteredBuildingPermits: this.filterBuildingPermits(buildingPermits, prevState.zipCode,
                                                          prevState.type)
    }));
  };

  filterBuildingPermits = (buildingPermits, zipCode, type) => {
    return buildingPermits.filter(permit => {
      return (permit.zipCode === zipCode || zipCode === 'all') &&
             (permit.type === type || type === 'all');
    });
  };

  onZipCodeChange = zipCode => {
    LocalStorage.set(zipCodeKey, zipCode);
    this.setState(prevState => ({
      zipCode,
      filteredBuildingPermits: this.filterBuildingPermits(prevState.buildingPermits,
                                                          zipCode, prevState.type)
    }));
  };

  onTypeChange = type => {
    LocalStorage.set(typeKey, type);
    this.setState(prevState => ({
      type,
      filteredBuildingPermits: this.filterBuildingPermits(prevState.buildingPermits,
                                                          prevState.zipCode, type)
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
                  onTypeChange={this.onTypeChange}
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
