import SocrataApi from './SocrataApi';
import BuildingPermit from './BuildingPermit';

const apiUrl = 'https://data.nashville.gov/resource/p5r5-bnga.json';

// https://data.nashville.gov/Licenses-Permits/Building-Permits-Issued/3h5w-q8b7
// https://dev.socrata.com/foundry/data.nashville.gov/p5r5-bnga
class BuildingPermitsIssuedApi extends SocrataApi {
  constructor(appToken) {
    super(appToken, apiUrl);
  }

  async getBuildingPermits() {
    const rows = await this.get();
    console.log(rows[0]);
    return rows.map(row => new BuildingPermit(row));
  }
}

export default BuildingPermitsIssuedApi;
