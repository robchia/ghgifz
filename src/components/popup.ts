import { El } from './element';

const COLUMNS = 4;
const MODAL_ID = 'ghgifz-modal';
const POPUP_ID = 'ghgifz-popup';
const HEADER_ID = 'ghgifz-popup-header';

export class Popup extends El {
  public onselect: (gif: any) => void;
  public onload: () => void;

  private popup: HTMLDivElement;
  private grid: HTMLDivElement;
  private gridContainer: HTMLDivElement;
  private modal: HTMLDivElement;
  private gifs: any = [];

  constructor() {
    super();

    this.element = document.createElement('div');

    this.initModal();
    this.initPopup();
  }

  public alignTo(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    const popupRect = this.popup.getBoundingClientRect();
    this.popup.style.top = (window.pageYOffset + rect.top + rect.height) + 'px';
    this.popup.style.left = (rect.left - popupRect.width) + rect.width + 'px';
  }

  public loadGifs(gifs) {
    const div = document.createElement('div');

    this.gifs = gifs;

    const randomizedGifs = this.randomized(this.gifs);

    for (const gif of randomizedGifs) {
      const img = document.createElement('img');
      img.onclick = () => {
        if (this.onselect) {
          this.onselect(gif);
        }
      };
      img.src = gif.thumb;
      img.title = gif.title;

      this.grid.appendChild(img);
    }
  }

  private initModal() {
    this.modal = document.createElement('div');
    this.modal.id = MODAL_ID;
    this.modal.onclick = () => {
      event.stopPropagation();
      this.remove();
    };

    this.element.appendChild(this.modal);
  }

  private initPopup() {
    this.popup = document.createElement('div');
    this.popup.id = POPUP_ID;
    this.popup.onclick = () => {
      event.stopPropagation();
    };
    this.element.appendChild(this.popup);

    this.initHeader();
    this.initGridContainer();
    this.initGrid();
  }

  private initHeader() {
    const headerDiv = document.createElement('div');
    headerDiv.id = HEADER_ID;

    const closeButton = document.createElement('div');
    closeButton.style.cssFloat = 'right';
    closeButton.innerHTML = '<svg aria-label="Close" class="ghgifz-popup-header-close" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>'
    closeButton.onclick = () => {
      this.remove();
    };
    headerDiv.appendChild(closeButton);

    const searchDiv = document.createElement('div');
    searchDiv.className = 'ghgifz-popup-header-title';
    searchDiv.innerHTML = 'SHHHHIP IT!';
    headerDiv.appendChild(searchDiv);

    this.popup.appendChild(headerDiv);
  }

  private initGridContainer() {
    this.gridContainer = document.createElement('div');
    this.gridContainer.id = 'ghgifz-popup-grid-container';
    this.popup.appendChild(this.gridContainer);
  }

  private initGrid() {
    this.grid = document.createElement('div');
    this.grid.id = 'ghgifz-popup-grid';
    this.gridContainer.appendChild(this.grid);
  }

  private randomized(gifs) {
    const randomized = gifs;

    let i = gifs.length;
    let tmp;
    let rand;

    while (i !== 0) {
      rand = Math.floor(Math.random() * i);
      i--;
      tmp = randomized[i];
      randomized[i] = randomized[rand];
      randomized[rand] = tmp;
    }

    return randomized;
  }
};
