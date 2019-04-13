import SocrataApi from './SocrataApi';

const apiUrl = 'https://data.nashville.gov/resource/p5r5-bnga.json';

// https://data.nashville.gov/Licenses-Permits/Building-Permits-Issued/3h5w-q8b7
// https://dev.socrata.com/foundry/data.nashville.gov/p5r5-bnga
class BuildingPermitsIssuedApi extends SocrataApi {
  constructor(appToken) {
    super(appToken, apiUrl);
  }
}

export default BuildingPermitsIssuedApi;
