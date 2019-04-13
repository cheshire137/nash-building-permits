import React, { Component } from 'react';
import BuildingPermitsIssuedApi from './models/BuildingPermitsIssuedApi';
import Config from './config.json';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    const api = new BuildingPermitsIssuedApi(Config.socrataApi.appToken);
    api.get().then(data => console.log(data));
  }

  render() {
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
        </main>
      </div>
    );
  }
}

export default App;
