import { Config } from '../config/config';
import { Store } from './store';
import { XHR } from './xhr';
import { Giphy } from './giphy';

const LAST_UPDATED_KEY = 'LastUpdated';
const GIFS_KEY = 'Gifs';

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
    return this.store.get(LAST_UPDATED_KEY);
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
    xhr.get(Config.gifsGistURL, (status: number, response: string) => {
      if (status != 200) {
        console.log('<Gifs>', status, response);
        return;
      }

      try {
        const gistJSON = JSON.parse(response);
        const content = gistJSON.files['gifz.json'].content;
        const ids = JSON.parse(content).ids;
        if (!ids.length) {
          return;
        }

        Giphy.gifs(ids, (json: any) => {
          if (!json) {
            return;
          }
          this.store.set(GIFS_KEY, json.data);
          this.store.set(LAST_UPDATED_KEY, new Date());
          cb();
        });
      } catch (e) {
        console.log('<Gifs>', e);
      }
    });
  }
}
