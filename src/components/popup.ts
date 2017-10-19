import { El } from './element';
import { Gif } from './gif';

const COLUMNS = 4;

export class Popup extends El {
  private popup: HTMLDivElement;
  private grid: HTMLDivElement;
  private gridContainer: HTMLDivElement;
  private modal: HTMLDivElement;
  private gifs: Array<Gif> = [];

  handler: (gif: Gif) => void;

  constructor() {
    super();

    this.element = document.createElement('div');

    this.initModal();
    this.initPopup();
    this.initGridContainer();
    this.initGrid();
  }

  initModal() {
    this.modal = document.createElement('div');
    this.modal.id = 'ghgifz-modal';
    this.modal.onclick = () => {
      event.stopPropagation();
      this.remove();
    };

    this.element.appendChild(this.modal);
  }

  initPopup() {
    this.popup = document.createElement('div');
    this.popup.id = 'ghgifz-popup';
    this.popup.onclick = () => {
      event.stopPropagation();
    };
    this.element.appendChild(this.popup);
  }

  initGridContainer() {
    this.gridContainer = document.createElement('div');
    this.gridContainer.id = 'ghgifz-popup-grid-container';
    this.popup.appendChild(this.gridContainer);
  }

  initGrid() {
    this.grid = document.createElement('div');
    this.grid.id = 'ghgifz-popup-grid';
    this.gridContainer.appendChild(this.grid);
  }

  alignTo(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const popupRect = this.popup.getBoundingClientRect();
    this.popup.style.top = (window.pageYOffset + rect.top + rect.height) + 'px';
    this.popup.style.left = (rect.left - popupRect.width) + rect.width + 'px';
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

  loadGifs(gifs) {
    const self = this;

    let div = document.createElement('div');

    this.gifs = gifs;

    let randomizedGifs = this.randomized(this.gifs);

    for (let i=0; i<randomizedGifs.length; i++) {
      let gif = randomizedGifs[i];
      let img = document.createElement('img');
      img.onclick = function() {
        if (self.handler) {
          self.handler(gif);
        }
      };
      img.src = gif.thumb;

      this.grid.appendChild(img);
    }
  }
};
