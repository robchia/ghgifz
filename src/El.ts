
export class El {
  el: HTMLElement;

  constructor() {
  }

  appendTo(el: Element) {
    el.appendChild(this.el);
  }

  isHidden() {
    return this.el.style.display != 'block';
  }

  show() {
    this.el.style.display = 'block';
  }

  hide() {
    this.el.style.display = 'none';
  }
};
