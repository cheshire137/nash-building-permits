import React, { Component } from 'react';
import BuildingPermitsIssuedApi from './models/BuildingPermitsIssuedApi';
import Config from './config.json';
import FilterForm from './components/FilterForm';
import PermitMap from './components/PermitMap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      zipCode: '',
      filteredData: []
    };
  }

  componentDidMount() {
    const api = new BuildingPermitsIssuedApi(Config.socrataApi.appToken);
    api.get().then(this.onDataLoaded);
  }

  onDataLoaded = data => {
    this.setState(prevState => ({
      data,
      isLoading: false,
      filteredData: this.filterData(data, prevState.zipCode)
    }));
  };

  filterData = (data, zipCode) => {
    return data.filter(row => row.zip === zipCode);
  };

  onZipCodeChange = zipCode => {
    this.setState(prevState => ({
      zipCode,
      filteredData: this.filterData(prevState.data, zipCode)
    }));
  };

  render() {
    const { data, isLoading, zipCode, filteredData } = this.state;

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
                  data={data}
                  zipCode={zipCode}
                  onZipCodeChange={this.onZipCodeChange}
                />
                <PermitMap
                  data={filteredData}
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
