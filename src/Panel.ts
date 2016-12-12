import { El } from './El';
import { Gif } from './Gif';

const COLUMNS = 4;

export class Panel extends El {
  private container: HTMLDivElement;
  private gifs: Array<Gif>;

  handler: (gif: Gif) => void;

  constructor(gifs) {
    super();

    this.gifs = gifs;

    let div = document.createElement('div');
    div.id = 'ghgifz-panel';
    div.className = 'border-top bg-gray-light';

    this.container = document.createElement('div');
    this.container.id = 'ghgifz-panel-container';
    div.appendChild(this.container);

    this.el = div;

    this.loadGifs();
  }

  randomized(gifs) {
    let randomized = gifs;

    let i = gifs.length;
    let tmp, rand;

    while (i !== 0) {
      rand = Math.floor(Math.random() * i);
      i--;
      tmp = randomized[i];
      randomized[i] = randomized[rand];
      randomized[rand] = tmp;
    }

    return randomized;
  }

  loadGifs() {
    const self = this;

    let div = document.createElement('div');

    let gifs = this.randomized(this.gifs);

    let cols = COLUMNS;
    let rows = Math.ceil(gifs.length / cols);

    for (let i=0; i<rows; i++) {
      let rowDiv = document.createElement('div');
      rowDiv.className = 'ghgifz-gif-row';

      for (let j=0; j<cols; j++) {
        const index = (i * cols) + j;
        if (index >= gifs.length) {
          break;
        }

        let gif = gifs[index];
        let img = document.createElement('img');
        img.src = gif.thumb;

        let gifCell = document.createElement('div');
        gifCell.className = 'ghgifz-gif-cell';
        gifCell.appendChild(img);
        gifCell.onclick = function() {
          if (self.handler) {
            self.handler(gif);
          }
        };
        rowDiv.appendChild(gifCell);
      }

      div.appendChild(rowDiv);
    }

    this.container.appendChild(div);
  }
};
