import { XHR } from './xhr';
import { Config } from '../config/config';

const API_URL = 'https://api.giphy.com/v1';
const GIFS_ENDPOINT = '/gifs';

export class Giphy {
  static url(endpoint: string, params: any) {
    const keys = Object.keys(params);
    const paramString = keys.map((key) => {
      return key + '=' + params[key]
    }).join('&');
    return API_URL + endpoint + '?api_key=' + Config.giphyAPIKey + '&' + paramString;
  }

  static gifs(ids: Array<string>, cb: (json: any) => void) {
    const xhr = new XHR();
    xhr.get(this.url(GIFS_ENDPOINT, { 'ids': ids }), (status: number, response: string) => {
      try {
        const json = JSON.parse(response);
        cb(json);
      } catch (e) {
        console.log('<Giphy>', e);
        cb(null);
      }
    });
  }
}
