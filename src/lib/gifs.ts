import { Config } from '../config/config';
import { Gif } from '../models/gif';
import { Giphy } from './giphy';
import { Store } from './store';
import { XHR } from './xhr';

const PREFIX = Config.appName + '_';
const LAST_UPDATED_KEY = PREFIX + 'LastUpdated';
const GIFS_KEY = PREFIX + 'Gifs';
const VERSION = PREFIX + 'Version';

export class Gifs {
  public static readonly store: Store = new Store();

  public static lastUpdated(): Date {
    const dateString = this.store.get(LAST_UPDATED_KEY) || '1970-01-01T00:00:00.000Z';
    return new Date(dateString);
  }

  public static localVersion(): string {
    return this.store.get(VERSION);
  }

  public static currentVersion(cb: (version: string) => void) {
    const xhr = new XHR();
    xhr.get(Config.gifsVersionURL, (status: number, response: string) => {
      cb(response);
    });
  }

  public static gifs(cb: (gifs: any) => void) {
    const gifs = this.store.get(GIFS_KEY);
    const mappedGifs = gifs.map((gif) => {
      const thumb = 'https://i.giphy.com/media/' + gif.id + '/100.gif';
      const large = 'https://i.giphy.com/media/' + gif.id + '/giphy.gif';
      return new Gif(gif.id, gif.title, thumb, large);
    });
    cb(mappedGifs);
  }

  public static update(cb: () => void) {
    const xhr = new XHR();
    xhr.get(Config.gifsJSONURL, (status: number, response: string) => {
      if (status !== 200) {
        throw new Error('<Gifs>' + status + response);
      }

      try {
        const json = JSON.parse(response);
        this.store.set(GIFS_KEY, json.gifs);
        this.store.set(LAST_UPDATED_KEY, new Date());
        this.store.set(VERSION, json.version);
        cb();
      } catch (e) {
        throw new Error('<Gifs>' + e);
      }
    });
  }
}
