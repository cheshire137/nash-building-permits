import LocalStorage from './LocalStorage';

const cachedUrlsKey = 'cached-urls';
const cachedResponsesKey = 'cached-responses';

const daysBetween = function(d1, d2) {
  const diff = Math.abs(d1.getTime() - d2.getTime());
  return diff / (1000 * 60 * 60 * 24);
};

class SocrataApi {
  constructor(appToken, baseUrl) {
    this.appToken = appToken;
    this.baseUrl = baseUrl;
  }

  urlFor(query) {
    return `${this.baseUrl}${query || ''}`;
  }

  async get(query) {
    const url = this.urlFor(query);
    const cachedUrls = LocalStorage.get(cachedUrlsKey) || {};
    const cachedResponses = LocalStorage.get(cachedResponsesKey) || {};
    const today = new Date();

    if (cachedUrls[url]) {
      const dateFetched = new Date(cachedUrls[url]);
      if (daysBetween(today, dateFetched) <= 1) {
        console.log('using cached data for', url);
        return cachedResponses[url];
      }
    }

    console.log('GET', url);
    const response = await window.fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-App-Token': this.appToken
      }
    })
    const json = await response.json();
    cachedResponses[url] = json;
    cachedUrls[url] = today;
    LocalStorage.set(cachedUrlsKey, cachedUrls);
    LocalStorage.set(cachedResponsesKey, cachedResponses);
    return json;
  }
}

export default SocrataApi;
