import React, { Component } from 'react';
import BuildingPermitsIssuedApi from './models/BuildingPermitsIssuedApi';
import Config from './config.json';
import FilterForm from './components/FilterForm';
import PermitMap from './components/PermitMap';
import PermitList from './components/PermitList';
import LocalStorage from './models/LocalStorage';
import './App.css';

const zipCodeKey = 'zip-code';
const typeKey = 'type';
const yearKey = 'year';

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
      const year = LocalStorage.get(yearKey) || prevState.year || 'all';

      return {
        buildingPermits,
        isLoading: false,
        zipCode,
        type,
        year,
        filteredBuildingPermits: this.filterBuildingPermits(buildingPermits,
                                                            { zipCode, type, year })
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
      year: 'all',
      filteredBuildingPermits: this.filterBuildingPermits(
        prevState.buildingPermits,
        { zipCode, type: 'all', year: 'all' }
      )
    }));
  };

  onTypeChange = type => {
    LocalStorage.set(typeKey, type);
    this.setState(prevState => ({
      type,
      year: 'all',
      filteredBuildingPermits: this.filterBuildingPermits(
        prevState.buildingPermits,
        { zipCode: prevState.zipCode, type, year: 'all' }
      )
    }));
  };

  onYearChange = year => {
    LocalStorage.set(yearKey, year);
    this.setState(prevState => ({
      year,
      filteredBuildingPermits: this.filterBuildingPermits(
        prevState.buildingPermits,
        { zipCode: prevState.zipCode, year, type: prevState.type }
      )
    }));
  };

  render() {
    const { buildingPermits, isLoading, zipCode, type, year,
            filteredBuildingPermits } = this.state;

    return (
      <div>
        <header className="site-header">
          <div className="container-lg py-3 d-flex flex-items-center flex-justify-between">
            <h1
              className="f3 text-normal"
            >Nashville Building Permits</h1>
            {isLoading ? null : (
              <FilterForm
                buildingPermits={buildingPermits}
                zipCode={zipCode}
                type={type}
                year={year}
                onYearChange={this.onYearChange}
                onZipCodeChange={this.onZipCodeChange}
                onTypeChange={this.onTypeChange}
              />
            )}
          </div>
        </header>
        <main className="site-main">
          <div className="container-lg">
            {isLoading ? (
              <div className="blankslate">
                <h2>Loading...</h2>
              </div>
            ) : (
              <div>
                <PermitMap
                  buildingPermits={filteredBuildingPermits}
                />
                <PermitList
                  buildingPermits={filteredBuildingPermits}
                />
              </div>
            )}
          </div>
        </main>
        <footer className="site-footer">
          <div className="container-lg py-1 d-flex flex-items-center flex-justify-between">
            <a
              target="_blank"
              className="link-gray"
              rel="noopener noreferrer"
              href="https://github.com/cheshire137/nash-building-permits"
            >View source</a>
            <span>
              Data from <a
                target="_blank"
                className="link-gray"
                rel="noopener noreferrer"
                href="https://data.nashville.gov/Licenses-Permits/Building-Permits-Issued/3h5w-q8b7"
              >Nashville Building Permits Issued</a>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
