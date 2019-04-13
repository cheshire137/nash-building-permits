class SocrataApi {
  constructor(appToken, baseUrl) {
    this.appToken = appToken;
    this.baseUrl = baseUrl;
  }

  get(query) {
    const url = `${this.baseUrl}${query || ''}`;
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Token': this.appToken
      }
    });
  }
}

export default SocrataApi;
