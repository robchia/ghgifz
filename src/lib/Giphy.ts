import { Config } from '../config/config';
import { XHR } from './xhr';

const API_URL = 'https://api.giphy.com/v1';
const GIFS_ENDPOINT = '/gifs';

export class Giphy {
  public static url(endpoint: string, params: any) {
    const keys = Object.keys(params);
    const paramString = keys.map((key) => {
      return key + '=' + params[key]
    }).join('&');
    return API_URL + endpoint + '?api_key=' + Config.giphyAPIKey + '&' + paramString;
  }

  public static gifs(ids: string[], cb: (json: any) => void) {
    const xhr = new XHR();
    xhr.get(this.url(GIFS_ENDPOINT, { ids }), (status: number, response: string) => {
      try {
        const json = JSON.parse(response);
        cb(json);
      } catch (e) {
        throw new Error('<Giphy>' + e);
      }
    });
  }
}
