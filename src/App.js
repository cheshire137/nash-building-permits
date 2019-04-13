import React, { Component } from 'react';
import BuildingPermitsIssuedApi from './models/BuildingPermitsIssuedApi';
import Config from './config.json';
import FilterForm from './components/FilterForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], isLoading: true, zipCode: '' };
  }

  componentDidMount() {
    const api = new BuildingPermitsIssuedApi(Config.socrataApi.appToken);
    api.get().then(data => this.setState(prevState => ({ data, isLoading: false })));
  }

  onZipCodeChange = zipCode => {
    this.setState(prevState => ({ zipCode }))
  };

  render() {
    const { data, isLoading, zipCode } = this.state;

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
              <FilterForm
                data={data}
                zipCode={zipCode}
                onZipCodeChange={this.onZipCodeChange}
              />
            )}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
