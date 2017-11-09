import { Config } from '../config/config';
import { Store } from './store';
import { XHR } from './xhr';
import { Giphy } from './giphy';

const PREFIX = Config.appName + '_';
const LAST_UPDATED_KEY = PREFIX + 'LastUpdated';
const GIFS_KEY = PREFIX + 'Gifs';
const VERSION = PREFIX + 'Version';

export class Gif {
  id: string;
  title: string;
  thumb: string;
  large: string;

  constructor(id: string, title: string, thumb: string, large: string) {
    this.id = id;
    this.title = title;
    this.thumb = thumb;
    this.large = large;
  }
}

export class Gifs {
  static store: Store = new Store();

  static lastUpdated(): Date {
    const dateString = this.store.get(LAST_UPDATED_KEY) || '1970-01-01T00:00:00.000Z';
    return new Date(dateString);
  }

  static localVersion(): string {
    return this.store.get(VERSION);
  }

  static currentVersion(cb: (version: string) => void) {
    const xhr = new XHR();
    xhr.get(Config.gifsVersionURL, (status: number, response: string) => {
      cb(response);
    });
  }

  static gifs(cb: (gifs: any) => void) {
    const gifs = this.store.get(GIFS_KEY);
    const mappedGifs = gifs.map((gif) => {
      const thumb = 'https://i.giphy.com/media/' + gif.id + '/100.gif';
      const large = 'https://i.giphy.com/media/' + gif.id + '/giphy.gif';
      return new Gif(gif.id, gif.title, thumb, large);
    });
    cb(mappedGifs);
  }

  static update(cb: () => void) {
    const xhr = new XHR();
    xhr.get(Config.gifsJSONURL, (status: number, response: string) => {
      if (status != 200) {
        console.log('<Gifs>', status, response);
        return;
      }

      try {
        const json = JSON.parse(response);

        this.store.set(GIFS_KEY, json.gifs);
        this.store.set(LAST_UPDATED_KEY, new Date());
        this.store.set(VERSION, json.version);
        cb();
      } catch (e) {
        console.log('<Gifs>', e);
      }
    });
  }
}
